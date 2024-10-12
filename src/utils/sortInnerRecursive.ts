const sortByValue = (node: any[]) => node.sort((a: any, b: any) => parseFloat(b.value) - parseFloat(a.value));

function sortInnerRecursive(node: any) {


    const tempAll = sortByValue(node)


    tempAll.forEach((row: any) => {
        if (row.subItems && row.subItems.length > 0) {
            // console.log(row.subItems)
            row.subItems = sortInnerRecursive(row.subItems)
            console.log(row.subItems)
        }
    })


    return tempAll;
}

// Example of usage with treeViewData
export default sortInnerRecursive