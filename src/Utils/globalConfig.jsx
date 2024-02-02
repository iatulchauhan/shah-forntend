export const globalAmountConfig = (value) => {
    const inputValue = value;

    let numericValue = inputValue?.toString().replace(/[^0-9\.]/g, "");
    const formattedValue = numericValue.replace(/(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/g, "$1,").replace(/(\.\d{2})\d+$/g, "$1");

    // if (generalConfigData?.find((config) => config.configDescription === "Imperial") && generalConfigData?.find((config) => config.configDescription === "Two-Decimal") && isNaN(numericValue)) {
    //   const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",").replace(/(\.\d{2})\d+$/g, "$1");
    //   return formattedValue;
    // }
    // if (generalConfigData?.find((config) => config.configDescription === "Metric") && generalConfigData?.find((config) => config.configDescription === "Two-Decimal") && !isNaN(numericValue)) {
    //   const formattedValue = numericValue.replace(/(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/g, "$1,").replace(/(\.\d{2})\d+$/g, "$1");
    //   return formattedValue;
    // }

    // if (generalConfigData?.find((config) => config.configDescription === "Imperial") && generalConfigData?.find((config) => config.configDescription === "No-Decimal") && !isNaN(numericValue)) {
    //   const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",").replace(/(\.\d{0})\d+$/g, "$1").replace(".", "");
    //   return formattedValue;
    // }
    // else if (generalConfigData?.find((config) => config.configDescription === "Metric") && generalConfigData?.find((config) => config.configDescription === "No-Decimal") && generalConfigData?.find((config) => config.configDescription === "Round-Up") && !isNaN(numericValue)) {
    //   const roundedValue = Math.ceil(parseFloat(numericValue));
    //   const formattedValue = roundedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //   return formattedValue;
    // }
    // else if (generalConfigData?.find((config) => config.configDescription === "Metric") && generalConfigData?.find((config) => config.configDescription === "No-Decimal") && generalConfigData?.find((config) => config.configDescription === "Round-Down") && !isNaN(numericValue)) {
    //   const formattedValue = numericValue.replace(/(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/g, "$1,").replace(/(\.\d{0})\d+$/g, "$1").replace(".", "");
    //   return formattedValue;
    // }
    // // else if (generalConfigData?.find((config) => config.configDescription === "Metric") && generalConfigData?.find((config) => config.configDescription === "No-Decimal") && generalConfigData?.find((config) => config.configDescription === "Round-Up") && !isNaN(numericValue)) {
    // //   const roundedValue = Math.ceil(parseFloat(numericValue));
    // //   const formattedValue = roundedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // //   return formattedValue;
    // // } 
    return formattedValue;
};


export const convertToNumber = (val) => {
    return Number(val?.toString()?.replace(/,/g, "")?.split(","))
}