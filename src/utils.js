export const sortData = (data) => {
    const sortedData = [...data];
    sortedData.sort((a, b) => a.cases > b.cases ? -1 : 1)
    return sortedData;
}

export const sortTodayData = (data) => {
    const sortedData = [...data];
    sortedData.sort((a, b) => a.todayCases > b.todayCases ? -1 : 1)
    return sortedData;
  }