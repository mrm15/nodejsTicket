import {createAggregationPipeline} from "./aggregationPipeline";
import {TicketAssignment} from "../../../models/ticketAssignment ";

const getDataByAggregation2 = async ({filters, currentPage = 1, pageSize = 5}: any) => {
    // const matchConditions: any[] = [
    //     {isDeleteDestination: false},  // Only assignments that are not deleted
    //     {readStatus: false},           // Only unread assignments
    //     {assignedToDepartmentId: userDepartment}  // Only assignments for the department
    // ];
    //
    // // Apply filters dynamically (if any exist in the payload)
    // if (filters && filters.length > 0) {
    //     filters.forEach((filter: any) => {
    //         matchConditions.push(processFilterOperators(filter));
    //     });
    // }

    // Create the pipeline using match conditions and pagination details
    const myPipeline = createAggregationPipeline({matchConditions: [], currentPage, pageSize});

    const result = await TicketAssignment.aggregate(myPipeline);
    debugger

    // Extract results and total document count
    const results = result[0]?.results;
    const totalDocuments = result[0]?.totalDocuments?.length > 0 ? result[0]?.totalDocuments[0]?.total : 0;

    return {
        results,           // Paginated results from aggregation
        totalDocuments,    // Total count from facet pipeline
        currentPage,       // The current page number
        pageSize   ,        // The page size used for pagination

        allResultData :result
    };
};

export default getDataByAggregation2;
