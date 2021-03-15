import React from 'react';
import { Link } from 'react-router-dom';
import paths from '../../../../config/paths';

const InboxRowLink = ({ content, emailId, onClick }) => {
  return (
    <Link
      className="link inbox__link"
      onClick={onClick}
      to={paths.email(emailId)}
    >
      {content}
    </Link>
  );
};

export default InboxRowLink;