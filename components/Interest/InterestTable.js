/* Display a grid of opanisation cards from an [op]
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
// import styled from 'styled-components'
import { Table, Button, Popconfirm } from 'antd'

class InterestTable extends Component {
  columns = [
    {
      title: 'person ID',
      dataIndex: 'person',
      key: 'person'
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status'
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => {
        const options = getEnabledButtons(record)
        let withdrawInviteText = <FormattedMessage id='withdrawVolunteerInvite' defaultMessage='Withdraw Invite' description='Button allowing event organizer to withdraw a invite already issued to an interested volunteer' />

        // Needed? Or is declining the end of the road?
        if (options.withdrawInviteButtonEnabled && !options.declineButtonEnabled && !options.inviteButtonEnabled) {
          withdrawInviteText = <FormattedMessage id='undeclineInvite' defaultMessage='Undecline Invite' description='Button allowing event organizer to "un-decline" a previously declined invite' />
        }

        return (
          <div>
            {options.inviteButtonEnabled ? <span>
              <Button type='primary' shape='round' onClick={this.handleInviteButtonClicked.bind(this, record)}>
                <FormattedMessage id='inviteVolunteer' defaultMessage='Invite' description='Button allowing event organizer to invite an interested volunteer' />
              </Button>
              &nbsp;
            </span> : null}
            {options.withdrawInviteButtonEnabled ? <span>
              <Button type='secondary' shape='round' onClick={this.handleWithdrawInviteButtonClicked.bind(this, record)}>
                {withdrawInviteText}
              </Button>
              &nbsp;
            </span> : null}
            {options.declineButtonEnabled ? <span>
              <Popconfirm title='Are you sure?' onConfirm={this.handleDeclineButtonClicked.bind(this, record)} okText='Yes' cancelText='No'>
                <Button type='danger' shape='round'>
                  <FormattedMessage id='declineVolunteer' defaultMessage='Decline' description='Button allowing event organizer to decline an interested volunteer' />
                </Button>
              </Popconfirm>
            </span> : null}
          </div>
        )
      }
    }
  ]

  handleInviteButtonClicked (interest) {
    this.props.onInvite(interest)
  }

  handleDeclineButtonClicked (interest) {
    this.props.onDecline(interest)
  }

  handleWithdrawInviteButtonClicked (interest) {
    this.props.onWithdrawInvite(interest)
  }

  render () {
    return (
      <Table columns={this.columns} dataSource={this.props.interests} pagination={false} />
    )
  }
}

InterestTable.propTypes = {
  onInvite: PropTypes.func.isRequired,
  onWithdrawInvite: PropTypes.func.isRequired,
  onDecline: PropTypes.func.isRequired
}

function getEnabledButtons (interest) {
  return {
    inviteButtonEnabled: interest.status === 'interested',
    declineButtonEnabled: interest.status !== 'completed' && interest.status !== 'cancelled' && interest.status !== 'declined',
    withdrawInviteButtonEnabled: interest.status !== 'completed' && interest.status !== 'cancelled' && interest.status !== 'interested'
  }
}

export default InterestTable
