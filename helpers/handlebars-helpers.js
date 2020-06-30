const moment = require('moment');

module.exports = {
    select: function(selected, options) {
        return options
            .fn(this)
            .replace(new RegExp(' value =\"' + selected + '\"'), '$&selected="selected"');
    },
    generateTime: function(date, format) {
        return moment(date).format(format);
    },
    paginate: function(options) {
        const { current, pages } = options.hash;
        let output = '';
        const pageListItem = (anchorContent, className, href) => (
            `<li class="page-item${className}"><a ${href ? `href="${href}" ` : ''}class="page-link">${anchorContent}</a></li>`
        );

        // First page link
        const isFirstPage = current === 1
        output += pageListItem(
            'First',
            isFirstPage ? ' disabled' : '',
            isFirstPage ? null : '?page=1'
        );

        let i = (Number(current) > 5 ? Number(current) - 4 : 1);

        // Low end dots
        if (i !== 1) {
            output += pageListItem('...', ' disabled');
        }

        // Page number links
        for (; i <= (Number(current) + 4) && i <= pages; i++) {
            let isCurrentPage = i === current;
            output += pageListItem(
                i,
                isCurrentPage ? ' active' : '',
                isCurrentPage ? null :`?page=${i}` 
            );

            // High end dots
            if (i === Number(current) + 4 && i < pages) {
                output += pageListItem('...', ' disabled');
            }
        }

        // Last page link
        const isLastPage = current === pages;
        output += pageListItem(
            'Last',
            isLastPage ? ' disabled' : '',
            isLastPage ? null : `?pages=${pages}`
        );

        return output;
    },
}
