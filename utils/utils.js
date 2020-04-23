export const parseGraphData = (data) => {
    console.log(data);
    let label = [];
    const dataLength = data.length;
    let startIndex = 0;
    let endIndex = dataLength;

    if (data.length >= 12) {
        startIndex = dataLength - 12;
    }

    //extracting labels
    let graphData = data.splice(startIndex, endIndex);

    label = graphData.map(item => item['Time'])

    console.log(label)
}