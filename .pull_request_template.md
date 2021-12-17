# Fixes

- [JIRA_ID](https://humandecode.atlassian.net/jira/software/c/projects/BDA/boards/25?modal=detail&selectedIssue=BDA-8&quickFilter=51)

## General Overview

The file getBirthdaysInfo.js create GET request of info
The file card.js, create component
The route birthdays.js render info with getServerSideProps() and return my <Card/> with props.

The information has not yet been rendered based on nearby birthdays in the next 7 days.
I want to know if I am doing well before continuing to implement code, or continue messing around.
### URLs affected

- http://localhost:3000/birthdays

- http://localhost:3000/terms

## Change Examples
CSS in terms.module.css, card.module.css, footer.module.css

## Technical Overview
Query raised yesterday:
How to think about the logic of a double navigation component. On mobile, as it is at the bottom of the screen (as if it were a footer), and in the Desktop version, as it is a traditional navigation bar.
When the user is in the mobile version, see the bottom navigation bar, when in Desktop, see the top navigation bar.
But, but, specifically in the / terms path, this bottom navigation bar must also remain active on the desktop and the top navigation bar must not exist.</div>
Query raised yesterday: How to think about the logic of a double navigation component. On mobile, as it is at the bottom of the screen (as if it were a footer), and in the Desktop version, as it is a traditional navigation bar. When the user is in the mobile version, see the bottom navigation bar, when in Desktop, see the top navigation bar. But, but, specifically in the / terms path, this bottom navigation bar must also remain active on the desktop and the top navigation bar must not exist.

### Changes

- Main changes list 