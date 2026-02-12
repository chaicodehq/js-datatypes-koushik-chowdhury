/**
 * 🚂 Indian Railway PNR Status System
 *
 * IRCTC ka PNR status system bana! PNR data milega with train info,
 * passengers, aur current statuses. Tujhe ek complete status report
 * generate karna hai with formatted output aur analytics.
 *
 * pnrData object:
 *   {
 *     pnr: "1234567890",
 *     train: { number: "12301", name: "Rajdhani Express", from: "NDLS", to: "HWH" },
 *     classBooked: "3A",
 *     passengers: [
 *       { name: "Rahul Kumar", age: 28, gender: "M", booking: "B1", current: "B1" },
 *       { name: "Priya Sharma", age: 25, gender: "F", booking: "WL5", current: "B3" },
 *       { name: "Amit Singh", age: 60, gender: "M", booking: "WL12", current: "WL8" }
 *     ]
 *   }
 *
 * Status rules (based on current field):
 *   - Starts with "B" or "S" (berth/seat) => status = "CONFIRMED"
 *   - Starts with "WL" => status = "WAITING"
 *   - Equals "CAN" => status = "CANCELLED"
 *   - Starts with "RAC" => status = "RAC"
 *
 * For each passenger generate:
 *   - formattedName: name.padEnd(20) + "(" + age + "/" + gender + ")"
 *   - bookingStatus: booking field value
 *   - currentStatus: current field value
 *   - statusLabel: one of "CONFIRMED", "WAITING", "CANCELLED", "RAC"
 *   - isConfirmed: boolean (true only if statusLabel === "CONFIRMED")
 *
 * Summary (use array methods on processed passengers):
 *   - totalPassengers: count of passengers
 *   - confirmed: count of CONFIRMED
 *   - waiting: count of WAITING
 *   - cancelled: count of CANCELLED
 *   - rac: count of RAC
 *   - allConfirmed: boolean - every passenger confirmed? (use every)
 *   - anyWaiting: boolean - some passenger waiting? (use some)
 *
 * Other fields:
 *   - chartPrepared: true if every NON-CANCELLED passenger is confirmed
 *   - pnrFormatted: "123-456-7890" (3-3-4 dash pattern, use slice + join or concatenation)
 *   - trainInfo: template literal =>
 *     "Train: {number} - {name} | {from} → {to} | Class: {classBooked}"
 *
 * Hint: Use padEnd(), slice(), join(), map(), filter(), every(), some(),
 *   startsWith(), template literals, typeof, Array.isArray()
 *
 * Validation:
 *   - Agar pnrData object nahi hai ya null hai, return null
 *   - Agar pnr string nahi hai ya exactly 10 digits nahi hai, return null
 *   - Agar train object missing hai, return null
 *   - Agar passengers array nahi hai ya empty hai, return null
 *
 * @param {object} pnrData - PNR data object
 * @returns {{ pnrFormatted: string, trainInfo: string, passengers: Array<{ formattedName: string, bookingStatus: string, currentStatus: string, statusLabel: string, isConfirmed: boolean }>, summary: { totalPassengers: number, confirmed: number, waiting: number, cancelled: number, rac: number, allConfirmed: boolean, anyWaiting: boolean }, chartPrepared: boolean } | null}
 *
 * @example
 *   processRailwayPNR({
 *     pnr: "1234567890",
 *     train: { number: "12301", name: "Rajdhani Express", from: "NDLS", to: "HWH" },
 *     classBooked: "3A",
 *     passengers: [
 *       { name: "Rahul", age: 28, gender: "M", booking: "B1", current: "B1" }
 *     ]
 *   })
 *   // => { pnrFormatted: "123-456-7890",
 *   //      trainInfo: "Train: 12301 - Rajdhani Express | NDLS → HWH | Class: 3A",
 *   //      passengers: [...], summary: { ..., allConfirmed: true }, chartPrepared: true }
 */
export function processRailwayPNR(pnrData) {
  // Your code here
  
  if (typeof pnrData !== 'object' || pnrData === null) return null;

  if (typeof pnrData.pnr !== 'string' || pnrData.pnr.length !== 10) return null;

  for (let i = 0; i < pnrData.pnr.length; i++) {
    if (pnrData.pnr[i] < '0' || pnrData.pnr[i] > '9') return null;
  }

  if (typeof pnrData.train !== 'object' || pnrData.train === null) return null;

  if (!Array.isArray(pnrData.passengers) || pnrData.passengers.length === 0) return null;

  let processedPassengers = pnrData.passengers.map((p) => {
    let statusLabel = '';

    if (p.current.startsWith('B') || p.current.startsWith('S')) {
      statusLabel = 'CONFIRMED';
    } else if (p.current.startsWith('WL')) {
      statusLabel = 'WAITING';
    } else if (p.current === 'CAN') {
      statusLabel = 'CANCELLED';
    } else if (p.current.startsWith('RAC')) {
      statusLabel = 'RAC';
    }

    return {
      formattedName: p.name.padEnd(20) + '(' + p.age + '/' + p.gender + ')',
      bookingStatus: p.booking,
      currentStatus: p.current,
      statusLabel: statusLabel,
      isConfirmed: statusLabel === 'CONFIRMED',
    };
  });

  let totalPassengers = processedPassengers.length;

  let confirmed = processedPassengers.filter((p) => p.statusLabel === 'CONFIRMED').length;
  let waiting = processedPassengers.filter((p) => p.statusLabel === 'WAITING').length;
  let cancelled = processedPassengers.filter((p) => p.statusLabel === 'CANCELLED').length;
  let rac = processedPassengers.filter((p) => p.statusLabel === 'RAC').length;

  let allConfirmed = processedPassengers.every((p) => p.statusLabel === 'CONFIRMED');

  let anyWaiting = processedPassengers.some((p) => p.statusLabel === 'WAITING');

  // ✅ Corrected logic
  let nonCancelled = processedPassengers.filter((p) => p.statusLabel !== 'CANCELLED');

  let chartPrepared = nonCancelled.length > 0 && nonCancelled.every((p) => p.statusLabel === 'CONFIRMED');

  let pnrFormatted = pnrData.pnr.slice(0, 3) + '-' + pnrData.pnr.slice(3, 6) + '-' + pnrData.pnr.slice(6);

  let trainInfo = `Train: ${pnrData.train.number} - ${pnrData.train.name} | ${pnrData.train.from} → ${pnrData.train.to} | Class: ${pnrData.classBooked}`;

  return {
    pnrFormatted,
    trainInfo,
    passengers: processedPassengers,
    summary: {
      totalPassengers,
      confirmed,
      waiting,
      cancelled,
      rac,
      allConfirmed,
      anyWaiting,
    },
    chartPrepared,
  };
}
