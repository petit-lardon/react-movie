import React from 'react';
import _ from 'lodash';

const Pagination = (props) => {
    const {itemsCount, pageSize, currentPage, onPageChange} = props;
    const pagesCount = Math.ceil(itemsCount / pageSize);
    if (pagesCount === 1) return null;

    const pages = _.range(1, pagesCount + 1);
    console.log('currentPage', currentPage);
    console.log('pagesCount', pagesCount);
    console.log('pages', pages);

    return (
        <nav>
            <ul className="pagination">
                {pages.map((p =>
                    <li className={p === currentPage ? 'page-item active' : 'page-item'} key={p}>
                        <a href="#" className="page-link" onClick={() => onPageChange(p)}>{p}</a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Pagination;
