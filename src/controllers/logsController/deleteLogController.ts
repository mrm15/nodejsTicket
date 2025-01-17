import { Response, NextFunction } from "express";
import { CustomRequestMyTokenInJwt } from "../../middleware/verifyJWT";
import { LogModel } from "../../models/logs";
import { checkAccessList } from "../../utils/checkAccessList";
import { ACCESS_LIST } from "../../utils/ACCESS_LIST";

const deleteLogController = async (
    req: CustomRequestMyTokenInJwt,
    res: Response,
) => {
    const { myToken } = req;

    // Ensure token exists
    if (!myToken) {
        res.status(403).json({ message: "مقدار توکن توی ری کوئست موجود نیست" });
        return;
    }

    // Check access permissions
    const arrayListToCheck = [ACCESS_LIST.fatherAccess];
    const hasAccessFatherAccess = await checkAccessList({
        phoneNumber: myToken.phoneNumber,
        arrayListToCheck,
    });

    if (!hasAccessFatherAccess) {
        res.status(403).json({ message: "شما مجوز دسترسی به این بخش را ندارید." });
        return;
    }

    try {
        // Extract the array of IDs from the request body
        const { ids }: { ids: string[] } = req.body;

        // Validate the input
        if (!Array.isArray(ids) || ids.length === 0) {
            res.status(400).json({ message: "آیدی‌های معتبر ارسال نشده است." });
            return;
        }

        // Attempt to delete all logs matching the provided IDs
        const deleteResult = await LogModel.deleteMany({ _id: { $in: ids } });

        // Check the number of deleted items
        if (deleteResult.deletedCount === 0) {
            res.status(404).json({ message: "هیچ لاگی پیدا نشد که حذف شود." });
            return;
        }

        // Successfully deleted logs
        res.status(200).json({
            message: `${deleteResult.deletedCount} لاگ با موفقیت حذف شدند.`,
        });
    } catch (error: any) {
        // Handle potential errors
        res.status(500).json({
            message: "خطا در حذف لاگ‌ها.",
            error: error?.message,
        });
    }
};

export { deleteLogController };
