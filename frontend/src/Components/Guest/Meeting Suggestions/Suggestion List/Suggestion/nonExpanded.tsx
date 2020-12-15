/* eslint-disable multiline-ternary */
import { Accordion, AccordionSummary, Typography } from '@material-ui/core'
import * as React from 'react'
import { Meeting as MeetingType } from '../../../types'
import { CheckIcon, CancelIcon, ChangeTimeIcon } from './icons'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { useStyles } from './style'
import teams from './icons/Teams.png'

interface expandedProps {
  meeting: MeetingType
  acceptHandler: (id: string) => void
  cancelHandler: (id: string) => void
  handleChange: (
    panel: string
  ) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => void
  expanded: string | false
}

export default function NonExpanded ({
  meeting,
  acceptHandler,
  cancelHandler,
  handleChange,
  expanded
}: expandedProps) {
  const endTime = new Date() // get current date
  endTime.setHours(
    meeting.pickedTimeWindow.getHours(),
    meeting.pickedTimeWindow.getMinutes() + 15,
    0,
    0
  )

  const styling = useStyles()

  return (
    <div>
      <Accordion
        className={styling.suggestionAccordion}
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <img src="" alt="" />
          <div className={styling.accordionSummaryContent}>
            <div className={styling.attendantName}>
              <Typography variant="h2">
                {meeting.name} {meeting.surname}
              </Typography>
            </div>
            <div className={styling.isOnlineDiv}>
              {meeting.isOnline ? (
                <img src={teams} alt="aasd" />
              ) : (
                <Typography variant="body2">na żywo</Typography>
              )}
            </div>
            <div className={styling.meetingPeriodDiv}>
              <Typography variant="h3">
                {meeting.pickedTimeWindow.getHours() < 10
                  ? '0' + meeting.pickedTimeWindow.getHours()
                  : meeting.pickedTimeWindow.getHours()}
                :
                {meeting.pickedTimeWindow.getMinutes() < 10
                  ? '0' + meeting.pickedTimeWindow.getMinutes()
                  : meeting.pickedTimeWindow.getMinutes()}
                -
                {endTime.getHours() < 10
                  ? '0' + endTime.getHours()
                  : endTime.getHours()}
                :
                {endTime.getMinutes() < 10
                  ? '0' + endTime.getMinutes()
                  : endTime.getMinutes()}
              </Typography>
            </div>
            <div className={styling.actionButtonsContainer}>
              <div
                onClick={function (event) {
                  acceptHandler(meeting.id)
                  event.stopPropagation()
                }}
                onFocus={(event) => event.stopPropagation()}
              >
                <CheckIcon className={styling.actionButton} />
              </div>
              <div
                onClick={function (event) {
                  cancelHandler(meeting.id)
                  event.stopPropagation()
                }}
              >
                <CancelIcon className={styling.actionButton} />
              </div>
              <div>
                <ChangeTimeIcon className={styling.actionButton} />
              </div>
            </div>
          </div>
        </AccordionSummary>
      </Accordion>
    </div>
  )
}
