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
    BDATA_001: 'Bdata_001',
    BDATA_002: 'Bdata_002',
    BDATA_003: 'Bdata_003',
    BDATA_004: 'Bdata_004',
}