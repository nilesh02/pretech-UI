export const parseGraphData = (data) => {
    //console.log(data);

    let label = [];
    const dataLength = data.length;
    let startIndex = 0;
    let endIndex = dataLength;

    if (data.length >= 12) {
        startIndex = dataLength - 12;
    }

    //extracting labels
    let graphData = data.splice(startIndex, endIndex);

    let labelArray = graphData.map(item => item[VARIABLES.TIME]);
    label = labelArray.map(item => item.split(':')[1]);
    // console.log(label)

    let productRecovered = graphData.map(item => parseInt(item[VARIABLES.PARA_010]));
    let rmConsumed = graphData.map(item => parseInt(item[VARIABLES.PARA_001]));
    let energyConsumed = graphData.map(item => parseInt(item[VARIABLES.PARA_009]));
    let effluentToETP = graphData.map(item => parseInt(item[VARIABLES.PARA_012]));

    return {
        label: label,
        productRecovered: productRecovered,
        rmConsumed: rmConsumed,
        energyConsumed: energyConsumed,
        effluentToETP: effluentToETP
    }
}

export const calculateTotalTime = (data) => {

    let startIndex = 0;
    let endIndex = data.length - 1;

    let startTime = data[startIndex][VARIABLES.TIME].split(':')

    let endTime = data[endIndex][VARIABLES.TIME].split(':')

    let startDate = data[startIndex][VARIABLES.DATE].split('/')

    let endDate = data[endIndex][VARIABLES.DATE].split('/')

    let startDateTime = new Date(parseInt(startDate[2]), parseInt(startDate[1]), parseInt(startDate[0]),
        parseInt(startTime[0]), parseInt(startTime[1]), parseInt(startTime[2]))

    let endDateTime = new Date(parseInt(endDate[2]), parseInt(endDate[1]), parseInt(endDate[0]),
        parseInt(endTime[0]), parseInt(endTime[1]), parseInt(endTime[2]))

    return (Math.round(((endDateTime - startDateTime) / 1000) / 60));
}

export const calculate_C_Para_Variables = (currentRow, benchmarkRow, totalTimeDifferenceInMinutes, P_ALT, BDATA_001, BDATA_002, BDATA_003, BDATA_004) => {

    let C_PARA_001 = currentRow[VARIABLES.PARA_001] / totalTimeDifferenceInMinutes;

    //Change PARA_002 to as discussed with business
    let C_PARA_002 = ((currentRow[VARIABLES.PARA_002] - BDATA_003) + (currentRow[VARIABLES.PARA_018] * BDATA_004) + (currentRow[VARIABLES.PARA_001] * BDATA_001)) * (benchmarkRow[VARIABLES.DATA_009]) / (currentRow[VARIABLES.PARA_001])

    let C_PARA_003 = (benchmarkRow[VARIABLES.DATA_009] * benchmarkRow[VARIABLES.BM_010]) / 100
    let C_PARA_004 = ((benchmarkRow[VARIABLES.DATA_009] * benchmarkRow[VARIABLES.BM_010]) - currentRow[VARIABLES.PARA_010]) / C_PARA_001
    let C_PARA_005 = P_ALT.P_ALT_001 > C_PARA_004 ? P_ALT.P_ALT_001 : C_PARA_004
    let C_PARA_008 = currentRow[VARIABLES.PARA_001] - currentRow[VARIABLES.PARA_010] - currentRow[VARIABLES.PARA_012]

    //Change PARA_002 to as discussed with business
    let C_PARA_009 = currentRow[VARIABLES.PARA_004] + currentRow[VARIABLES.PARA_002]

    //Change PARA_002 to as discussed with business
    let C_PARA_010 = currentRow[VARIABLES.PARA_003] + currentRow[VARIABLES.PARA_002]

    let C_PARA_011 = currentRow[VARIABLES.PARA_001] + currentRow[VARIABLES.PARA_002] - C_PARA_009 - C_PARA_010

    //Change C_PARA_002 to as discussed with business
    let C_PARA_012 = currentRow[VARIABLES.PARA_003] - C_PARA_011 - C_PARA_002

    let C_PARA_013 = currentRow[VARIABLES.PARA_004] - C_PARA_009 - C_PARA_010

    return {
        C_PARA_001: Math.round(C_PARA_001 *100)/100,
        C_PARA_002: Math.round(C_PARA_002 *100)/100,
        C_PARA_003: Math.round(C_PARA_003 *100)/100,
        C_PARA_004: Math.round(C_PARA_004 *100)/100,
        C_PARA_005: Math.round(C_PARA_005 *100)/100,
        C_PARA_008: Math.round(C_PARA_008 *100)/100,
        C_PARA_009: Math.round(C_PARA_009 *100)/100,
        C_PARA_010: Math.round(C_PARA_010 *100)/100,
        C_PARA_011: Math.round(C_PARA_011 *100)/100,
        C_PARA_012: Math.round(C_PARA_012 *100)/100,
        C_PARA_013: Math.round(C_PARA_013 *100)/100,
    }
}

export const calculate_P_Alt_Variables = (currentRow, benchmarkRow, totalTimeDifferenceInMinutes) => {

    let P_ALT_001 = (parseFloat(benchmarkRow[VARIABLES.DATA_001]) - parseFloat(currentRow[VARIABLES.PARA_001])) / (parseFloat(currentRow[VARIABLES.PARA_001]) / parseFloat(totalTimeDifferenceInMinutes))

    let P_ALT_002 = (parseFloat(currentRow[VARIABLES.PARA_010]) / parseFloat(currentRow[VARIABLES.PARA_001])) * parseFloat(benchmarkRow[VARIABLES.DATA_009])

    return {
        P_ALT_001: P_ALT_001,
        P_ALT_002: P_ALT_002
    }
}


export const VARIABLES = {
    PARA_001: 'Para-001',
    PARA_002: 'Para-002',
    PARA_003: 'Para-003',
    PARA_004: 'Para-004',
    PARA_005: 'Para-005',
    PARA_006: 'Para-006',
    PARA_007: 'Para-007',
    PARA_008: 'Para-008',
    PARA_009: 'Para-009',
    PARA_010: 'Para-010',
    PARA_011: 'Para-011',
    PARA_012: 'Para-012',
    PARA_013: 'Para-013',
    PARA_014: 'Para-014',
    PARA_015: 'Para-015',
    PARA_016: 'Para-016',
    PARA_017: 'Para-017',
    PARA_018: 'Para-018',
    TIME: 'Time',
    DATE: 'Date',
    BDATA_001: 'Bdata_001',
    BDATA_002: 'Bdata_002',
    BDATA_003: 'Bdata_003',
    BDATA_004: 'Bdata_004',
    DATA_001: 'Data-001',
    DATA_002: 'Data-002',
    DATA_003: 'Data-003',
    DATA_004: 'Data-004',
    DATA_005: 'Data-005',
    DATA_006: 'Data-006',
    DATA_007: 'Data-007',
    DATA_008: 'Data-008',
    DATA_009: 'Data-009',
    DATA_011: 'Data-011',
    BM_001: 'BM-001',
    BM_002: 'BM-002',
    BM_003: 'BM-003',
    BM_004: 'BM-004',
    BM_005: 'BM-005',
    BM_006: 'BM-006',
    BM_007: 'BM-007',
    BM_008: 'BM-008',
    BM_009: 'BM-009',
    BM_010: 'BM-010'
}