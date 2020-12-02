const core = require('@actions/core')
const fetch = require('node-fetch')

async function sendMessage(slackWebhookUrl, releaseMessage) {
  console.log(slackWebhookUrl)
  console.log(text)
  const text = {
    text: releaseMessage
  }
  const response = await fetch(slackWebhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(text)
  })
  console.log(JSON.stringify(response))
  return response
}

function run() {
  try {
    const slackWebhookUrl = core.getInput('slackWebhookUrl')
    const releaseMessage = core.getInput('releaseMessage')
    if (!slackWebhookUrl || !releaseMessage) {
      throw new Error('Missing parameters')
    }
    const response = sendMessage(slackWebhookUrl, releaseMessage)

    core.setOutput('response', response)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
