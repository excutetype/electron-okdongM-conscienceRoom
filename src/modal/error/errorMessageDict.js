const errorMessageDict = {
  database: {
    connection: {
      title: "데이터베이스 연결 오류",
      description: [
        "데이터베이스 설정이 올바른지 확인하십시오.",
        "프로그램을 재실행 하십시오.",
      ],
    },
  },
  electronStore: {
    set: {
      title: "일렉트론 스토어 저장 오류",
      description: [
        "다시 시도하여 주십시오.",
        "문제가 계속될 경우 관리자에게 문의하십시오.",
      ],
    },
    get: {
      title: "일렉트론 스토어 불러오기 오류",
      description: [
        "다시 시도하여 주십시오.",
        "문제가 계속될 경우 관리자에게 문의하십시오.",
      ],
    },
  },
  uncaught: {
    title: "알 수 없는 오류",
    description: ["관리자에게 문의하십시오."],
  },
};

export default errorMessageDict;
