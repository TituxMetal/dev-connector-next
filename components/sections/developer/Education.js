import { List, Item, P, Title } from './CareerItems'
import { formatDate } from '../../../lib'

const Education = ({ educations }) => (
  <List>
    {educations.length > 0 ? (
      educations.map((education, key) => (
        <Item key={key}>
          <Title>{education.school}</Title>
          <P>
            {formatDate(education.from)} -{' '}
            {education.current ? 'Current' : formatDate(education.to)}
          </P>
          <P>
            <strong>Degree: </strong>
            {education.degree}
          </P>
          <P>
            <strong>Field Of Study: </strong>
            {education.fieldofstudy}
          </P>
          <P>
            <strong>Description: </strong>
            {education.description}
          </P>
        </Item>
      ))
    ) : (
      <Item>
        <Title>No educations</Title>
        <P>Please add educations in your profile</P>
      </Item>
    )}
  </List>
)

export default Education
