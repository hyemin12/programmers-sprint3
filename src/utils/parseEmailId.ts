/** 이메일에서 아이디만 추출하는 함수 */
export const parseEmailId = (email: string) => email.split('@')[0];
