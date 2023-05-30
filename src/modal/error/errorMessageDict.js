const errorMessageDict = {
  database: {
    connection: {
      title: "데이터베이스 연결 오류",
      descriptions: ["프로그램을 재실행 하십시오.", "문제가 계속될 경우 관리자에게 문의하십시오."],
    },
    crud: {
      title: "데이터베이스 CRUD 에러",
      descriptions: ["다시 시도하여 주십시오.", "문제가 계속될 경우 관리자에계 문의하십시오."],
    },
  },
  electronStore: {
    set: {
      title: "일렉트론 스토어 저장 오류",
      descriptions: ["다시 시도하여 주십시오.", "문제가 계속될 경우 관리자에게 문의하십시오."],
    },
    get: {
      title: "일렉트론 스토어 불러오기 오류",
      descriptions: ["다시 시도하여 주십시오.", "문제가 계속될 경우 관리자에게 문의하십시오."],
    },
  },
  app: {
    openSerialport: {
      title: "바코드 리더기 연결 오류",
      descriptions: ["프로그램을 종료하십시오.", "바코드 리더기를 연결하십시오.", "프로그램을 재실행 하십시오."],
    },
    printExcel: {
      title: "액셀 파일 출력 오류",
      descriptions: ["다시 시도하여 주십시오.", "문제가 계속될 경우 관리자에게 문의하십시오."],
    },
  },
  uncaught: {
    title: "알 수 없는 오류",
    descriptions: ["관리자에게 문의하십시오."],
  },
};

export default errorMessageDict;
