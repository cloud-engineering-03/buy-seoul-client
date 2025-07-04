import { ApiClient } from "@/api";

export default defineEventHandler(async (event) => {
  // POST 요청의 body를 읽어옵니다.
  const body = await readBody(event);
  const { stationName, minPrice, maxPrice } = body;

  // 유효성 검사
  if (!stationName || !minPrice || !maxPrice) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "stationName, minPrice, maxPrice는 필수입니다.",
    });
  }

  const apiClient = new ApiClient();

  try {
    const results =
      await apiClient.estateSearchController.searchByStationAndBudget({
        stationName: stationName,
        maxPrice: Number(maxPrice),
      });

    return results;
  } catch (error: any) {
    throw createError({
      statusCode: error.status || 500,
      statusMessage: error.statusText || "Internal Server Error",
      message: error.body?.message || "외부 API 호출에 실패했습니다.",
    });
  }
});
