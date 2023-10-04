import React from 'react'
import ReactPaginate from 'react-paginate'
import PropTypes from 'prop-types'

function PaginationComponent(props) {
  const handlePageClick = (data) => {
    const selectedPage = data.selected + 1
    props.onPageChange(selectedPage)
    localStorage.setItem('value', selectedPage)
  }

  return (
    <div className="row">
      <div className="col d-flex justify-content-center mt-4">
        <ReactPaginate
          breakLabel="..."
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          forcePage={props.currentPage - 1}
          pageCount={props.pageCount}
          renderOnZeroPageCount={null}
          containerClassName="pagination justify-content-center pt-3"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousLinkClassName="page-link"
          previousClassName="page-item"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
        />
      </div>
    </div>
  )
}
PaginationComponent.propTypes = {
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  pageCount: PropTypes.number.isRequired,
}

export default PaginationComponent
