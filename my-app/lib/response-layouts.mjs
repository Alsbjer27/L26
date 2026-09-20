export const responseLayouts = {
  application: {
    tab: 'Ansökningar',
    headers: ['Datum', 'Namn', 'LIU-ID', 'E-post', 'Klass', 'Post', 'Motivering'],
    fields: ['name', 'liuId', 'email', 'className', 'role', 'message'],
  },
  nomination: {
    tab: 'Nomineringar',
    headers: ['Datum', 'Nominerad person', 'LIU-ID', 'Klass', 'Post', 'Motivering'],
    fields: ['nominee', 'liuId', 'className', 'role', 'message'],
  },
};

// Store a numeric spreadsheet date in Stockholm local time, including DST.
export function sheetDate(iso) {
  const parts = Object.fromEntries(new Intl.DateTimeFormat('sv-SE', {
    timeZone: 'Europe/Stockholm', year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23',
  }).formatToParts(new Date(iso)).map(part => [part.type, part.value]));
  return Date.UTC(Number(parts.year), Number(parts.month) - 1, Number(parts.day),
    Number(parts.hour), Number(parts.minute), Number(parts.second)) / 86400000 + 25569;
}
