<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h1 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          검색 조건을 입력하세요
        </h1>
        <p class="mt-4 text-lg text-gray-500">
          지하철 노선과 예산을 선택하면 적합한 지역을 추천해드립니다
        </p>
      </div>

      <div class="max-w-3xl mx-auto">
        <div class="bg-white shadow rounded-lg p-6">
          <div class="space-y-6">
            <!-- 지하철 역 선택 -->
            <div class="relative">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                지하철 역 선택
              </label>
              <div class="relative">
                <input
                  type="text"
                  v-model="searchQuery"
                  @focus="isOpen = true"
                  @input="filterStations"
                  placeholder="역을 검색하세요"
                  class="p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                <div
                  v-if="isOpen"
                  class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm"
                >
                  <template v-for="line in filteredLines" :key="line.id">
                    <div
                      v-if="line.stations.length > 0"
                      class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50"
                    >
                      {{ line.name }}
                    </div>
                    <div
                      v-for="station in line.stations"
                      :key="station.id"
                      class="cursor-pointer select-none relative py-2 pl-4 pr-9 hover:bg-indigo-50"
                      @click="selectStation(station)"
                    >
                      <span class="block truncate">{{ station.name }}</span>
                    </div>
                  </template>
                </div>
              </div>
              <div v-if="selectedStation" class="mt-2">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                >
                  {{ getSelectedStationName() }}
                  <button
                    type="button"
                    class="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white"
                    @click="clearSelection"
                  >
                    <span class="sr-only">선택 해제</span>
                    <svg
                      class="h-2 w-2"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 8 8"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-width="1.5"
                        d="M1 1l6 6m0-6L1 7"
                      />
                    </svg>
                  </button>
                </span>
              </div>
            </div>

            <!-- 예산 입력 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                예산 범위 (만원)
              </label>
              <div class="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  v-model="minPrice"
                  placeholder="최소"
                  class="p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                <input
                  type="number"
                  v-model="maxPrice"
                  placeholder="최대"
                  class="p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>

            <!-- 검색 버튼 -->
            <div class="pt-4">
              <button
                @click="search"
                class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                시세 조회하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const searchQuery = ref("");
const isOpen = ref(false);
const selectedStation = ref<{ id: string; name: string } | null>(null);
const minPrice = ref("");
const maxPrice = ref("");

const filteredLines = computed(() => {
  if (!searchQuery.value) {
    return subwayLines;
  }

  const query = searchQuery.value.toLowerCase();
  return subwayLines.map((line) => ({
    ...line,
    stations: line.stations.filter((station) =>
      station.name.toLowerCase().includes(query)
    ),
  }));
});

const filterStations = () => {
  isOpen.value = true;
};

const selectStation = (station: { id: string; name: string }) => {
  selectedStation.value = station;
  searchQuery.value = station.name;
  isOpen.value = false;
};

const clearSelection = () => {
  selectedStation.value = null;
  searchQuery.value = "";
};

const getSelectedStationName = () => {
  return selectedStation.value?.name || "";
};

const search = () => {
  if (!selectedStation.value || !minPrice.value || !maxPrice.value) {
    alert("모든 조건을 입력해주세요");
    return;
  }

  navigateTo({
    path: "/result",
    query: {
      station: selectedStation.value.id,
      min: minPrice.value,
      max: maxPrice.value,
    },
  });
};

const subwayLines = [
  {
    id: "1",
    name: "1호선",
    stations: [
      { id: "101", name: "소요산" },
      { id: "102", name: "동두천" },
      { id: "103", name: "보산" },
      { id: "104", name: "동두천중앙" },
      { id: "105", name: "지행" },
      { id: "106", name: "덕정" },
      { id: "107", name: "덕계" },
      { id: "108", name: "양주" },
      { id: "109", name: "녹양" },
      { id: "110", name: "가능" },
      { id: "111", name: "의정부" },
      { id: "112", name: "회룡" },
      { id: "113", name: "망월사" },
      { id: "114", name: "도봉산" },
      { id: "115", name: "도봉" },
      { id: "116", name: "방학" },
      { id: "117", name: "창동" },
      { id: "118", name: "녹천" },
      { id: "119", name: "월계" },
      { id: "120", name: "광운대" },
      { id: "121", name: "석계" },
      { id: "122", name: "신이문" },
      { id: "123", name: "외대앞" },
      { id: "124", name: "회기" },
      { id: "125", name: "청량리" },
      { id: "126", name: "제기동" },
      { id: "127", name: "신설동" },
      { id: "128", name: "동묘앞" },
      { id: "129", name: "동대문" },
      { id: "130", name: "종로5가" },
      { id: "131", name: "종로3가" },
      { id: "132", name: "종각" },
      { id: "133", name: "시청" },
      { id: "134", name: "서울역" },
      { id: "135", name: "남영" },
      { id: "136", name: "용산" },
      { id: "137", name: "노량진" },
      { id: "138", name: "대방" },
      { id: "139", name: "신길" },
      { id: "140", name: "영등포" },
      { id: "141", name: "신도림" },
      { id: "142", name: "구로" },
      { id: "143", name: "구일" },
      { id: "144", name: "개봉" },
      { id: "145", name: "오류동" },
      { id: "146", name: "온수" },
      { id: "147", name: "역곡" },
      { id: "148", name: "소사" },
      { id: "149", name: "부천" },
      { id: "150", name: "중동" },
      { id: "151", name: "송내" },
      { id: "152", name: "부개" },
      { id: "153", name: "부평" },
      { id: "154", name: "백운" },
      { id: "155", name: "동암" },
      { id: "156", name: "간석" },
      { id: "157", name: "주안" },
      { id: "158", name: "도화" },
      { id: "159", name: "제물포" },
      { id: "160", name: "도원" },
      { id: "161", name: "동인천" },
      { id: "162", name: "인천" },
    ],
  },
  {
    id: "2",
    name: "2호선",
    stations: [
      { id: "201", name: "시청" },
      { id: "202", name: "을지로입구" },
      { id: "203", name: "을지로3가" },
      { id: "204", name: "을지로4가" },
      { id: "205", name: "동대문역사문화공원" },
      { id: "206", name: "신당" },
      { id: "207", name: "상왕십리" },
      { id: "208", name: "왕십리" },
      { id: "209", name: "한양대" },
      { id: "210", name: "뚝섬" },
      { id: "211", name: "성수" },
      { id: "212", name: "건대입구" },
      { id: "213", name: "구의" },
      { id: "214", name: "강변" },
      { id: "215", name: "잠실나루" },
      { id: "216", name: "잠실" },
      { id: "217", name: "잠실새내" },
      { id: "218", name: "종합운동장" },
      { id: "219", name: "삼성" },
      { id: "220", name: "선릉" },
      { id: "221", name: "역삼" },
      { id: "222", name: "강남" },
      { id: "223", name: "교대" },
      { id: "224", name: "서초" },
      { id: "225", name: "방배" },
      { id: "226", name: "사당" },
      { id: "227", name: "낙성대" },
      { id: "228", name: "서울대입구" },
      { id: "229", name: "봉천" },
      { id: "230", name: "신림" },
      { id: "231", name: "신대방" },
      { id: "232", name: "구로디지털단지" },
      { id: "233", name: "대림" },
      { id: "234", name: "신도림" },
      { id: "235", name: "문래" },
      { id: "236", name: "영등포구청" },
      { id: "237", name: "당산" },
      { id: "238", name: "합정" },
      { id: "239", name: "홍대입구" },
      { id: "240", name: "신촌" },
      { id: "241", name: "이대" },
      { id: "242", name: "아현" },
      { id: "243", name: "충정로" },
    ],
  },
  {
    id: "3",
    name: "3호선",
    stations: [
      { id: "301", name: "대화" },
      { id: "302", name: "주엽" },
      { id: "303", name: "정발산" },
      { id: "304", name: "마두" },
      { id: "305", name: "백석" },
      { id: "306", name: "대곡" },
      { id: "307", name: "화정" },
      { id: "308", name: "원당" },
      { id: "309", name: "원흥" },
      { id: "310", name: "삼송" },
      { id: "311", name: "지축" },
      { id: "312", name: "구파발" },
      { id: "313", name: "연신내" },
      { id: "314", name: "불광" },
      { id: "315", name: "녹번" },
      { id: "316", name: "홍제" },
      { id: "317", name: "무악재" },
      { id: "318", name: "독립문" },
      { id: "319", name: "경복궁" },
      { id: "320", name: "안국" },
      { id: "321", name: "종로3가" },
      { id: "322", name: "을지로3가" },
      { id: "323", name: "충무로" },
      { id: "324", name: "동대입구" },
      { id: "325", name: "약수" },
      { id: "326", name: "금호" },
      { id: "327", name: "옥수" },
      { id: "328", name: "압구정" },
      { id: "329", name: "신사" },
      { id: "330", name: "잠원" },
      { id: "331", name: "고속터미널" },
      { id: "332", name: "교대" },
      { id: "333", name: "남부터미널" },
      { id: "334", name: "양재" },
      { id: "335", name: "매봉" },
      { id: "336", name: "도곡" },
      { id: "337", name: "대치" },
      { id: "338", name: "학여울" },
      { id: "339", name: "대청" },
      { id: "340", name: "일원" },
      { id: "341", name: "수서" },
      { id: "342", name: "가락시장" },
      { id: "343", name: "경찰병원" },
      { id: "344", name: "오금" },
    ],
  },
  {
    id: "4",
    name: "4호선",
    stations: [
      { id: "401", name: "당고개" },
      { id: "402", name: "상계" },
      { id: "403", name: "노원" },
      { id: "404", name: "창동" },
      { id: "405", name: "쌍문" },
      { id: "406", name: "수유" },
      { id: "407", name: "미아" },
      { id: "408", name: "미아사거리" },
      { id: "409", name: "길음" },
      { id: "410", name: "성신여대입구" },
      { id: "411", name: "한성대입구" },
      { id: "412", name: "혜화" },
      { id: "413", name: "동대문" },
      { id: "414", name: "동대문역사문화공원" },
      { id: "415", name: "충무로" },
      { id: "416", name: "명동" },
      { id: "417", name: "회현" },
      { id: "418", name: "서울역" },
      { id: "419", name: "숙대입구" },
      { id: "420", name: "삼각지" },
      { id: "421", name: "신용산" },
      { id: "422", name: "이촌" },
      { id: "423", name: "동작" },
      { id: "424", name: "총신대입구" },
      { id: "425", name: "사당" },
      { id: "426", name: "남태령" },
      { id: "427", name: "선바위" },
      { id: "428", name: "경마공원" },
      { id: "429", name: "대공원" },
      { id: "430", name: "과천" },
      { id: "431", name: "정부과천청사" },
      { id: "432", name: "인덕원" },
      { id: "433", name: "평촌" },
      { id: "434", name: "범계" },
      { id: "435", name: "금정" },
      { id: "436", name: "산본" },
      { id: "437", name: "수리산" },
      { id: "438", name: "대야미" },
      { id: "439", name: "반월" },
      { id: "440", name: "상록수" },
      { id: "441", name: "한대앞" },
      { id: "442", name: "중앙" },
      { id: "443", name: "고잔" },
      { id: "444", name: "초지" },
      { id: "445", name: "안산" },
      { id: "446", name: "신길온천" },
      { id: "447", name: "정왕" },
      { id: "448", name: "오이도" },
    ],
  },
  {
    id: "5",
    name: "5호선",
    stations: [
      { id: "501", name: "방화" },
      { id: "502", name: "개화산" },
      { id: "503", name: "김포공항" },
      { id: "504", name: "송정" },
      { id: "505", name: "마곡" },
      { id: "506", name: "발산" },
      { id: "507", name: "우장산" },
      { id: "508", name: "화곡" },
      { id: "509", name: "까치산" },
      { id: "510", name: "신정" },
      { id: "511", name: "목동" },
      { id: "512", name: "오목교" },
      { id: "513", name: "양평" },
      { id: "514", name: "영등포구청" },
      { id: "515", name: "영등포시장" },
      { id: "516", name: "신길" },
      { id: "517", name: "여의도" },
      { id: "518", name: "여의나루" },
      { id: "519", name: "마포" },
      { id: "520", name: "공덕" },
      { id: "521", name: "애오개" },
      { id: "522", name: "충정로" },
      { id: "523", name: "서대문" },
      { id: "524", name: "광화문" },
      { id: "525", name: "종로3가" },
      { id: "526", name: "을지로4가" },
      { id: "527", name: "동대문역사문화공원" },
      { id: "528", name: "청구" },
      { id: "529", name: "신금호" },
      { id: "530", name: "행당" },
      { id: "531", name: "왕십리" },
      { id: "532", name: "마장" },
      { id: "533", name: "답십리" },
      { id: "534", name: "장한평" },
      { id: "535", name: "군자" },
      { id: "536", name: "아차산" },
      { id: "537", name: "광나루" },
      { id: "538", name: "천호" },
      { id: "539", name: "강동" },
      { id: "540", name: "둔촌동" },
      { id: "541", name: "올림픽공원" },
      { id: "542", name: "방이" },
      { id: "543", name: "오금" },
      { id: "544", name: "개롱" },
      { id: "545", name: "거여" },
      { id: "546", name: "마천" },
    ],
  },
  {
    id: "6",
    name: "6호선",
    stations: [
      { id: "601", name: "응암" },
      { id: "602", name: "역촌" },
      { id: "603", name: "불광" },
      { id: "604", name: "독바위" },
      { id: "605", name: "연신내" },
      { id: "606", name: "구산" },
      { id: "607", name: "새절" },
      { id: "608", name: "증산" },
      { id: "609", name: "디지털미디어시티" },
      { id: "610", name: "월드컵경기장" },
      { id: "611", name: "마포구청" },
      { id: "612", name: "망원" },
      { id: "613", name: "합정" },
      { id: "614", name: "상수" },
      { id: "615", name: "광흥창" },
      { id: "616", name: "대흥" },
      { id: "617", name: "공덕" },
      { id: "618", name: "효창공원앞" },
      { id: "619", name: "삼각지" },
      { id: "620", name: "녹사평" },
      { id: "621", name: "이태원" },
      { id: "622", name: "한강진" },
      { id: "623", name: "버티고개" },
      { id: "624", name: "약수" },
      { id: "625", name: "청구" },
      { id: "626", name: "신당" },
      { id: "627", name: "동묘앞" },
      { id: "628", name: "창신" },
      { id: "629", name: "보문" },
      { id: "630", name: "안암" },
      { id: "631", name: "고려대" },
      { id: "632", name: "월곡" },
      { id: "633", name: "상월곡" },
      { id: "634", name: "돌곶이" },
      { id: "635", name: "석계" },
      { id: "636", name: "태릉입구" },
      { id: "637", name: "화랑대" },
      { id: "638", name: "봉화산" },
    ],
  },
  {
    id: "7",
    name: "7호선",
    stations: [
      { id: "701", name: "장암" },
      { id: "702", name: "도봉산" },
      { id: "703", name: "수락산" },
      { id: "704", name: "마들" },
      { id: "705", name: "노원" },
      { id: "706", name: "중계" },
      { id: "707", name: "하계" },
      { id: "708", name: "공릉" },
      { id: "709", name: "태릉입구" },
      { id: "710", name: "먹골" },
      { id: "711", name: "중화" },
      { id: "712", name: "상봉" },
      { id: "713", name: "면목" },
      { id: "714", name: "사가정" },
      { id: "715", name: "용마산" },
      { id: "716", name: "중곡" },
      { id: "717", name: "군자" },
      { id: "718", name: "어린이대공원" },
      { id: "719", name: "건대입구" },
      { id: "720", name: "뚝섬유원지" },
      { id: "721", name: "청담" },
      { id: "722", name: "강남구청" },
      { id: "723", name: "학동" },
      { id: "724", name: "논현" },
      { id: "725", name: "반포" },
      { id: "726", name: "고속터미널" },
      { id: "727", name: "내방" },
      { id: "728", name: "이수" },
      { id: "729", name: "남성" },
      { id: "730", name: "숭실대입구" },
      { id: "731", name: "상도" },
      { id: "732", name: "장승배기" },
      { id: "733", name: "신대방삼거리" },
      { id: "734", name: "보라매" },
      { id: "735", name: "신풍" },
      { id: "736", name: "대림" },
      { id: "737", name: "남구로" },
      { id: "738", name: "가산디지털단지" },
      { id: "739", name: "철산" },
      { id: "740", name: "광명사거리" },
      { id: "741", name: "천왕" },
      { id: "742", name: "온수" },
      { id: "743", name: "까치울" },
      { id: "744", name: "부천종합운동장" },
      { id: "745", name: "춘의" },
      { id: "746", name: "신중동" },
      { id: "747", name: "부천시청" },
      { id: "748", name: "상동" },
      { id: "749", name: "삼산체육관" },
      { id: "750", name: "굴포천" },
      { id: "751", name: "부평구청" },
    ],
  },
  {
    id: "8",
    name: "8호선",
    stations: [
      { id: "801", name: "암사" },
      { id: "802", name: "천호" },
      { id: "803", name: "강동구청" },
      { id: "804", name: "몽촌토성" },
      { id: "805", name: "잠실" },
      { id: "806", name: "석촌" },
      { id: "807", name: "송파" },
      { id: "808", name: "가락시장" },
      { id: "809", name: "문정" },
      { id: "810", name: "장지" },
      { id: "811", name: "복정" },
      { id: "812", name: "산성" },
      { id: "813", name: "남한산성입구" },
      { id: "814", name: "단대오거리" },
      { id: "815", name: "신흥" },
      { id: "816", name: "수진" },
      { id: "817", name: "모란" },
    ],
  },
  {
    id: "9",
    name: "9호선",
    stations: [
      { id: "901", name: "개화" },
      { id: "902", name: "김포공항" },
      { id: "903", name: "공항시장" },
      { id: "904", name: "신방화" },
      { id: "905", name: "마곡나루" },
      { id: "906", name: "양천향교" },
      { id: "907", name: "가양" },
      { id: "908", name: "증미" },
      { id: "909", name: "등촌" },
      { id: "910", name: "염창" },
      { id: "911", name: "신목동" },
      { id: "912", name: "선유도" },
      { id: "913", name: "당산" },
      { id: "914", name: "국회의사당" },
      { id: "915", name: "여의도" },
      { id: "916", name: "샛강" },
      { id: "917", name: "노량진" },
      { id: "918", name: "노들" },
      { id: "919", name: "흑석" },
      { id: "920", name: "동작" },
      { id: "921", name: "구반포" },
      { id: "922", name: "신반포" },
      { id: "923", name: "고속터미널" },
      { id: "924", name: "사평" },
      { id: "925", name: "신논현" },
      { id: "926", name: "언주" },
      { id: "927", name: "선정릉" },
      { id: "928", name: "삼성중앙" },
      { id: "929", name: "봉은사" },
      { id: "930", name: "종합운동장" },
      { id: "931", name: "삼전" },
      { id: "932", name: "석촌고분" },
      { id: "933", name: "석촌" },
      { id: "934", name: "송파나루" },
      { id: "935", name: "한성백제" },
      { id: "936", name: "올림픽공원" },
      { id: "937", name: "둔촌오륜" },
      { id: "938", name: "중앙보훈병원" },
    ],
  },
];
</script>

<style scoped>
.max-h-60 {
  max-height: 15rem;
}
</style>
