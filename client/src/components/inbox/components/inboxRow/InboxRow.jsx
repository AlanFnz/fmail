import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import InboxRowIcons from '../inboxRowIcons/InboxRowIcons';
import { Link } from 'react-router-dom';
import paths from '../../../../config/paths';

const InboxRow = ({ email }) => {
  const className = email.viewedAt
    ? 'inbox__table-row--viewed'
    : 'inbox__table-row';

  const emailSnippet = `${email.body.substring(0, 50)}...`;

  return (
    <TableRow className={className}>
      <TableCell className='inbox__table-cell'>
        <InboxRowIcons isImportant={email.isImportant} emailId={email._id} />
      </TableCell>
      <TableCell className='inbox__table-cell--bold'>
        <Link className='link inbox__link' to={paths.email(email._id)}>
          {email.subject}
        </Link>
      </TableCell>
      <TableCell className='inbox__table-cell'>
        <Link className='link inbox__link' to={paths.email(email._id)}>
          {emailSnippet}
        </Link>
      </TableCell>
      <TableCell className='inbox__table-cell--bold'>
        <Link className='link inbox__link' to={paths.email(email._id)}>
          {email.timestamp}
        </Link>
      </TableCell>
    </TableRow>
  )
};

export default InboxRow;
