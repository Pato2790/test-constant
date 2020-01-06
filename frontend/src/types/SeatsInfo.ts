export interface SeatsInfo {
  columns: {
    aisle: number
    cantSeats: number
    acronymSeats: string[]
  }
  rows: number
  bookedSeats: string[]
}