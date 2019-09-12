import { Wrapper } from '../../../styled'
import { InputField, TextHelper } from '../../UI'

const SocialFields = ({ error, fields, change }) => {
  const handleChange = event =>
    change({ ...fields, social: { ...fields.social, [event.target.name]: event.target.value } })

  return (
    <Wrapper vertical>
      <InputField
        change={handleChange}
        name='twitter'
        type='text'
        label='Your Twitter username'
        error={error && error['social,twitter']}
        value={fields.social.twitter}
      />
      <InputField
        change={handleChange}
        name='linkedin'
        type='text'
        label='Your LinkedIn username'
        error={error && error['social,linkedin']}
        value={fields.social.linkedin}
      />
      <InputField
        change={handleChange}
        name='youtube'
        type='text'
        label='Your Youtube username'
        error={error && error['social,youtube']}
        value={fields.social.youtube}
      />
      <InputField
        change={handleChange}
        name='facebook'
        type='text'
        label='Your Facebook username'
        error={error && error['social,facebook']}
        value={fields.social.facebook}
      />
    </Wrapper>
  )
}

export default SocialFields
