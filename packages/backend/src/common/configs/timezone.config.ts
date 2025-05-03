import { DateTime } from 'luxon';

export const setGlobalTimezone = () => {
  DateTime.local().setZone('Europe/Kyiv');
};
