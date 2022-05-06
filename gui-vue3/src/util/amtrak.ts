
const MAJOR_STATIONS = [
    'BOS', 'SPG', 'NHV', 'NYP', 'PHL', 'WAS', 'RVM',
    'CHI', 'PGH', 'TOL',
    'STL', 'DAL', 'KCY',
    'DEN', 'SEA', 'OKJ', 'LAX', 'NOL',
];

const NORTHEAST_REGIONAL_STATIONS = [
    'BOS', 'BBY', 'RTE', 'PVD', 'KIN', 'WLY', 'MYS', 'NLC', 'OSB',
    'SPG', 'WNL', 'WND', 'HFD', 'BER', 'MDN', 'WFD', 'STS',
    'NHV', 'BRP', 'STM', 'NRO',
    'NYP', 'NWK', 'EWR', 'MET', 'NBK', 'PJC', 'TRE', 'CWH', 'PHN',
    'PHL', 'WIL', 'NRK', 'ABE', 'BAL', 'BWI', 'NCR',
    'WAS', 'ALX',
    'BCV', 'MSS', 'CLP', 'CVS', 'LYH', /* Bedford */ 'RNK', /* Christiansburg */
    'WDB', 'QAN', 'FBG', 'ASD', 'RVR',
    'PTB', 'NFK',
    'RVM', 'WBG', 'NPN',
];

const STATIONS_BY_ROUTE = {
    88: NORTHEAST_REGIONAL_STATIONS,
};

export {
    MAJOR_STATIONS,
    NORTHEAST_REGIONAL_STATIONS,
    STATIONS_BY_ROUTE,
};
