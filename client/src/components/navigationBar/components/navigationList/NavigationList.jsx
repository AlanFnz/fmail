import React from 'react';
import NavigationListItem from './NavigationListItem';
import paths from '../../../../config/paths';
import isSelected from './isSelected';

const NavigationList = ({ pathname }) => {
  return (
    <nav className="navigation-bar__nav">
      <ul className="navigation-bar__ul">
        <NavigationListItem
          label="Inbox"
          isSelected={isSelected(pathname, paths.inbox)}
          path={paths.inbox}
        />
        <NavigationListItem
          label="Important"
          isSelected={isSelected(pathname, paths.important)}
          path={paths.important}
        />
        <NavigationListItem
          label="Sent Mail"
          isSelected={isSelected(pathname, paths.sentMail)}
          path={paths.sentMail}
        />
        <NavigationListItem
          label="Drafts"
          isSelected={isSelected(pathname, paths.drafts)}
          path={paths.drafts}
        />
        <NavigationListItem
          label="Spam"
          isSelected={isSelected(pathname, paths.spam)}
          path={paths.spam}
        />
      </ul>
    </nav>
  );
};

export default NavigationList;
