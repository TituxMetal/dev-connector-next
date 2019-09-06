import { List, Item, P, Title } from './CareerItems'
import { formatDate } from '../../../lib'

const Experience = ({ experiences }) => (
  <List>
    {experiences.length > 0 ? (
      experiences.map((exp, key) => (
        <Item key={key}>
          <Title>{exp.company}</Title>
          <P>
            {formatDate(exp.from)} - {exp.current ? 'Current' : formatDate(exp.to)}
          </P>
          <P>
            <strong>Location: </strong>
            {exp.location}
          </P>
          <P>
            <strong>Status: </strong>
            {exp.title}
          </P>
          <P>
            <strong>Description: </strong>
            {exp.description}
          </P>
        </Item>
      ))
    ) : (
      <Item>
        <Title>No experiences</Title>
        <P>Please add experiences in your profile</P>
      </Item>
    )}
  </List>
)

export default Experience
