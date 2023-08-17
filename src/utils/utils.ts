import { useAppSelector } from "../reducers/hooks";

const timeRange = useAppSelector(state => state.timeRange)
const selectedSpaces = useAppSelector(state => state.selectedSpaces).spaces
const selectedSpacesIds = selectedSpaces.map(space => space.id)

export const toDateFormat = (timestamp: number): string => { 
  return new Date(timestamp).toISOString().split('T')[0]
}; 

export const toTimestamp = (dateFormat: string): number => { 
  return Date.parse(dateFormat)
}; 

export const withinTimeRange = (timeStamp: number ): boolean => {
  return timeRange.startDate <= timeStamp && timeStamp <= timeRange.endDate
}

export const amongSelectedSpaces = (spaceId: string): boolean => {
  return selectedSpacesIds.includes(spaceId)
}

export default { toDateFormat, toTimestamp }; 