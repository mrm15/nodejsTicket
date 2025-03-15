import processFilterOperators
    from "../../ticketAssigmentUtils/readDepartmentTicketsControllerUtils/processFilterOperators";
import {createAggregationPipelineForTickets} from "../createAggregationPipelineForTickets";
import {Ticket} from "../../../models/ticket";
import {LogModel} from "../../../models/logs";
import {createAggregationPipelineForLogs} from "../../Logs/createAggregationPipelineForLogs";

interface inputObjectGetDataByAggregation2 {
    filters: any[],
    page: number,
    pageSize: number
}

const getAllTicketsByAggregation = async ({filters, page, pageSize}: inputObjectGetDataByAggregation2) => {

    const matchConditions:any =[]
    // Apply filters dynamically (if any exist in the payload)
    if (filters && filters.length > 0) {
        filters.forEach((filter: any) => {
            matchConditions.push(processFilterOperators(filter));
        });
    }

    // console.log(matchConditions)
    // Create the pipeline using match conditions and pagination details
    const myPipelineForLogs = createAggregationPipelineForLogs({matchConditions, page, pageSize});

    const result = await LogModel.aggregate(myPipelineForLogs);


    // Extract results and total document count
    const results = result[0]?.results;
    const totalDocuments = result[0]?.totalDocuments?.length > 0 ? result[0]?.totalDocuments[0]?.total : 0;


    const startIndex =( page - 1) * pageSize;
    results.forEach((row: any, index: number) => {
        row.rowNumber = startIndex + index + 1;
    })

    return {
        results,           // Paginated results from aggregation
        totalDocuments,    // Total count from facet pipeline
        currentPage: page,       // The current page number
        pageSize,        // The page size used for pagination

        // allResultData: result
    }
};

export default getAllTicketsByAggregation;
