const Excel = require("exceljs");
const AppError = require("../../error/custom_error/AppError");

const appService = {
  printExcel: async (data) => {
    try {
      const backgroundPath = `${require("osenv").home()}\\Desktop`;
      const workbook = await createWorkbook(data);
      workbook.xlsx.writeFile(backgroundPath + `/${Math.floor(Math.random() * 10 ** 8)}_양심물품실.xlsx`);
    } catch {
      throw new AppError.PrintExcelError();
    }
  },
};

async function createWorkbook(data) {
  const workbook = new Excel.Workbook();

  workbook.creator = "양심물품실";
  workbook.lastModifiedBy = "양심물품실";

  const sheet1 = workbook.addWorksheet("Sheet1");

  const kindOfColumns = [
    { header: "학년", key: "borrower_grade" },
    { header: "반", key: "borrower_class_NM" },
    { header: "번호", key: "borrower_number" },
    { header: "이름", key: "borrower_name" },
    { header: "빌린 물품", key: "product_name" },
    { header: "대여일", key: "borrow_date" },
    { header: "반납일", key: "returned_date" },
  ];

  sheet1.columns = kindOfColumns.map((column) => {
    return {
      header: column.header,
      key: column.key,
      width: "20",
      style: {
        font: { size: 16 },
      },
    };
  });

  data.forEach((borrowData) => {
    sheet1.addRow({ ...borrowData });
  });

  return workbook;
}

module.exports = appService;
