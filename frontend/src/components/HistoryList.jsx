import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem } from 'reactstrap';

function HistoryList({ history }) {
  if (!history || history.length === 0) {
    return <div className="mt-4 text-muted">No recent links.</div>;
  }
  return (
    <div className="mt-4">
      <h5>Recent Shortened Links</h5>
      <ListGroup>
        {history.map((item) => (
          <ListGroupItem key={item.short_code} className="d-flex flex-column flex-md-row align-items-md-center justify-content-between">
            <div style={{ maxWidth: "200px", wordBreak: "break-all" }}>
              <strong>Short:</strong> <span className="text-break">{item.short_url}</span>
            </div>
            <div style={{ maxWidth: "350px", overflowX: "auto", wordBreak: "break-all" }}>
              <strong>Original:</strong> <span className="text-break">{item.original_url}</span>
            </div>
            <div>
              <small className="text-secondary">{new Date(item.created_at).toLocaleString()}</small>
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}

HistoryList.propTypes = {
  history: PropTypes.arrayOf(
    PropTypes.shape({
      original_url: PropTypes.string.isRequired,
      short_code: PropTypes.string.isRequired,
      short_url: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
    })
  ),
};

export default HistoryList;
