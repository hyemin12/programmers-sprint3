/** 아름 앞 두글자를 제외하고 가리는 함수*/
export const hidePartialName = (name: string) => name.substring(0, 2) + '*'.repeat(name.length - 2);
