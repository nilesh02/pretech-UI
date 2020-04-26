export const parseGraphData = (data, benchmarkRow) => {

    let label = [];
    let completeData = [...data];
    const dataLength = data.length;
    let startIndex = 0;
    let endIndex = dataLength;

    if (data.length >= 12) {
        startIndex = dataLength - 12;
    }


    //extracting labels
    let graphData = data.splice(startIndex, endIndex);

    let projectionScreenData = calculateProjectionScreenGraphData(startIndex, graphData, completeData, benchmarkRow);

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
        effluentToETP: effluentToETP,
        P_ALT_001: projectionScreenData.P_ALT_001,
        P_ALT_002: projectionScreenData.P_ALT_002,
        C_PARA_001: projectionScreenData.C_PARA_001
    }
}


export const calculateProjectionScreenGraphData = (startIndex, lastOneHourData, completeData, benchmarkRow) => {

    let finalDataForP_ALT_01 = [];
    let finalDataForP_ALT_02 = [];
    let finalDataForC_PARA_01 = [];

    let initialCompleteData = [...completeData];

    for (let i = 0; i < lastOneHourData.length; i++) {

        let endIndex = i + startIndex;
        let totalTime = calculateTotalTime(initialCompleteData.splice(0, endIndex));

        let P_ALT = calculate_P_Alt_Variables(lastOneHourData[i], benchmarkRow, totalTime);
        let C_PARA_001 = (lastOneHourData[i][VARIABLES.PARA_001]) / totalTime;

        finalDataForC_PARA_01[i] = C_PARA_001;
        finalDataForP_ALT_01[i] = P_ALT.P_ALT_001;
        finalDataForP_ALT_02[i] = P_ALT.P_ALT_002;
        initialCompleteData = [...completeData];

    }


    return {
        P_ALT_001: finalDataForP_ALT_01,
        P_ALT_002: finalDataForP_ALT_02,
        C_PARA_001: finalDataForC_PARA_01
    }

}

export const calculateTotalTime = (data) => {

    let startIndex = getStartIndex(data);
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
        C_PARA_001: parseFloat(C_PARA_001).toFixed(2),
        C_PARA_002: parseFloat(C_PARA_002).toFixed(2),
        C_PARA_003: parseFloat(C_PARA_003).toFixed(2),
        C_PARA_004: parseFloat(C_PARA_004).toFixed(2),
        C_PARA_005: parseFloat(C_PARA_005).toFixed(2),
        C_PARA_008: parseFloat(C_PARA_008).toFixed(2),
        C_PARA_009: parseFloat(C_PARA_009).toFixed(2),
        C_PARA_010: parseFloat(C_PARA_010).toFixed(2),
        C_PARA_011: parseFloat(C_PARA_011).toFixed(2),
        C_PARA_012: parseFloat(C_PARA_012).toFixed(2),
        C_PARA_013: parseFloat(C_PARA_013).toFixed(2),
    }
}

export const calculate_P_Alt_Variables = (currentRow, benchmarkRow, totalTimeDifferenceInMinutes) => {

    let P_ALT_001 = (parseFloat(benchmarkRow[VARIABLES.DATA_009]) - parseFloat(currentRow[VARIABLES.PARA_001])) / (parseFloat(currentRow[VARIABLES.PARA_001]) / parseFloat(totalTimeDifferenceInMinutes))

    let P_ALT_002 = (parseFloat(currentRow[VARIABLES.PARA_010]) / parseFloat(currentRow[VARIABLES.PARA_001])) * parseFloat(benchmarkRow[VARIABLES.DATA_009])

    return {
        P_ALT_001: parseFloat(P_ALT_001).toFixed(2),
        P_ALT_002: parseFloat(P_ALT_002).toFixed(2)
    }
}

export const getNormalizedData = (data) => {

    let maximum = Math.max(...data);
    let minimum = Math.min(...data);

    if (maximum === minimum) {
        return data;
    }

    return data.map(item => ((item - minimum) / (maximum - minimum)) * 100);
}

export const getDaysHrsMins = (value) => {

    let mins = parseFloat(value);
    let hours = parseFloat(mins / 60);
    let days = parseFloat(hours / 24);

    return (days.toFixed(2) + "/\n" + hours.toFixed(2) + "/\n" + mins.toFixed(2))
}

const getStartIndex = (data) => {

    if (data.length > 0) {
        for (let i = 0; i < data.length - 1; i++) {
            if (data[i][VARIABLES.PARA_001] > 200) {
                return i;
            }
        }
        return data.length - 1
    }
    return 0;
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

export const DAYS_HOURS_MINS_STRING = "Days/" + "\n" + "Hours/" + "\n" + "Mins"