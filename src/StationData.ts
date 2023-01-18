export type StationData = {
  lon: number,
  lat: number,
  name: string,
  bikesAvailable: number,
  docksAvailable: number,
  id: string,
}

export type StationListData = StationData[]