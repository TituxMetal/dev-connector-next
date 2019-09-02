import styled from 'styled-components'

const Svg = styled.svg`
  animation: rotate 1.75s linear infinite;
  z-index: 2;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -35px 0 0 -35px;
  width: 70px;
  height: 70px;

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`

const Circle = styled.circle`
  stroke: ${({ theme }) => theme.secondary};
  stroke-linecap: round;
  animation: dash 1.25s ease-in-out infinite;
`

const Spinner = () => (
  <Svg viewBox='0 0 50 50'>
    <Circle cx='25' cy='25' r='20' fill='none' strokeWidth='3' />
  </Svg>
)

export default Spinner
