'use strict';

const codemodReportFactory = (codemod, report)=>({
        codemod,
        report
    });
const reportFactory = (report)=>({
        ...report
    });

exports.codemodReportFactory = codemodReportFactory;
exports.reportFactory = reportFactory;
//# sourceMappingURL=report.js.map
