import pandas as pd
from ingestion import FileIngestion

class DataProcessor:
    def __init__(self, data):
        self.data = data

    def clean_csv_data(self):
        """Clean membership data from CSV files."""
        if not self.data.get("csv"):
            return None
        
        cleaned_csv = {}
        for file_name, df in self.data["csv"].items():
            df = df.copy()

            # Handle missing values
            df.fillna({"Revenue": 0, "Duration (Minutes)": 0}, inplace=True)

            # Convert Date column to datetime
            if "Date" in df.columns:
                df["Date"] = pd.to_datetime(df["Date"], errors="coerce")

            # Ensure NaN revenue is converted to None (JSON compatible)
            df["Revenue"] = df["Revenue"].apply(lambda x: None if pd.isna(x) else x)

            # Preserve Source column if it exists
            if "Source" not in df.columns:
                df["Source"] = f"CSV: {file_name}"

            cleaned_csv[file_name] = df

        return cleaned_csv

    def clean_json_employee_data(self):
        """Extract employee-level data from JSON and structure it as a DataFrame."""
        if not self.data.get("json") or "dataset1" not in self.data["json"]:
            return None

        employee_records = []

        # ✅ Iterate over companies inside dataset1
        for company in self.data["json"]["dataset1"].get("companies", []):
            company_name = company.get("name", "Unknown Company")
            employees = company.get("employees", [])

            # ✅ Extract employee details
            for employee in employees:
                employee_records.append({
                    "Employee ID": employee.get("id"),
                    "Name": employee.get("name"),
                    "Role": employee.get("role"),
                    "Salary": employee.get("salary", 0),  # Fixed incorrect key
                    "Hired Date": pd.to_datetime(employee.get("hired_date"), errors="coerce"),
                    "Company": company_name,
                    "Source": "JSON: dataset1 (employees)"
                })

        return pd.DataFrame(employee_records) if employee_records else None

    def clean_json_company_data(self):
        """Extract company-level data excluding employees."""
        if not self.data.get("json") or "dataset1" not in self.data["json"]:
            return None

        company_records = []

        for company in self.data["json"]["dataset1"].get("companies", []):
            company_info = {
                "Company ID": company.get("id"),
                "Company Name": company.get("name"),
                "Industry": company.get("industry"),
                "Revenue": None if pd.isna(company.get("revenue")) else company.get("revenue"),  # Handle NaN
                "Location": company.get("location"),
                "Source": "JSON: dataset1 (companies)"
            }
            company_records.append(company_info)

        return pd.DataFrame(company_records) if company_records else None

    def clean_pdf_data(self):
        """Clean and format tables from PDF files."""
        if not self.data.get("pdf"):
            return None
        
        cleaned_pdf = {}
        for file_name, pdf_data in self.data["pdf"].items():
            for table_index, table in enumerate(pdf_data.get("tables", [])):
                df = pd.DataFrame(table).copy()

                # Ensure table is not empty
                if not df.empty:
                    df.columns = df.iloc[0]
                    df = df[1:].reset_index(drop=True)
                    df["Source"] = f"PDF: {file_name} (Table {table_index + 1})"
                    cleaned_pdf[f"{file_name}_table{table_index + 1}"] = df

        return cleaned_pdf

    def clean_pptx_data(self):
        """Extract text and tables from PowerPoint slides."""
        if not self.data.get("pptx"):
            return None
        
        pptx_text = []
        pptx_tables = {}

        for file_name, slides in self.data["pptx"].items():
            for slide in slides:
                slide_number = slide.get("slide_number")
                content = slide.get("content", "").strip()
                tables = slide.get("tables", [])

                # Store textual content
                pptx_text.append({
                    "File": file_name,
                    "Slide": slide_number,
                    "Type": "Text",
                    "Content": content,
                    "Source": f"PPTX: {file_name} (Slide {slide_number})"
                })

                # Process tables if they exist
                if tables and isinstance(tables, list):
                    for table_index, table in enumerate(tables):
                        try:
                            df = table if isinstance(table, pd.DataFrame) else pd.DataFrame(table)

                            # Ensure table is not empty
                            if not df.empty:
                                df.columns = df.iloc[0]
                                df = df[1:].reset_index(drop=True)
                                df["Source"] = f"PPTX: {file_name} (Slide {slide_number} Table {table_index + 1})"

                                pptx_tables[f"{file_name}_Slide{slide_number}_Table{table_index + 1}"] = df
                        except Exception as e:
                            print(f"⚠️ Error processing table in {file_name}, Slide {slide_number}: {e}")

        return {"pptx_text": pptx_text, "pptx_tables": pptx_tables} if pptx_text or pptx_tables else None

    def process_all(self):
        """Run all processing steps and return cleaned data."""
        return {
            "cleaned_csv": self.clean_csv_data(),
            "json_company_data": self.clean_json_company_data(),
            "json_employee_data": self.clean_json_employee_data(),
            "cleaned_pdf": self.clean_pdf_data(),
            "cleaned_pptx": self.clean_pptx_data(),
        }


# Example usage
if __name__ == "__main__":
    ingestion = FileIngestion()
    raw_data = ingestion.ingest_all()

    processor = DataProcessor(raw_data)
    processed_data = processor.process_all()

    print("\n📌 Processed Data:", processed_data)
