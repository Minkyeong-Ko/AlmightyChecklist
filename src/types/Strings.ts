const CategoryStrings = {
    roadTrip: '로드 트립',
    tripAbroad: '해외 여행',
    camping: '캠핑 여행',
    newCar: '자동차 구매',
    newHouse: '집 구하기',
    marry: '결혼 준비',
} as const
type CategoryStrings = (typeof CategoryStrings)[keyof typeof CategoryStrings]

const HeaderStrings = {
    title: 'ChatGPT가 만들어주는 체크리스트',
    createButton: '새로 만들기',
} as const
type HeaderStrings = (typeof HeaderStrings)[keyof typeof HeaderStrings]

export { HeaderStrings, CategoryStrings }
