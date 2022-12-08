# 스타트 24팀 캐릭캐릭뮤직체인지

### 딥러닝 기반 음악 스타일 트랜스퍼 - User Interactive Ro-Fi Player
#### 스타트 최종제출을 위한 깃허브 레포지토리입니다.

스타트 시연 영상 유튜브 링크 주소 : https://youtu.be/YM9b9UfQ6_k

프로토타입 링크 : https://www.figma.com/proto/0lQelKl44MLlpqbLfhGxjX/Untitled?node-id=64%3A2&scaling=min-zoom&page-id=0%3A1

## DDSP Timbre transfer colab demo

<a href="https://colab.research.google.com/drive/1mXKViJAEU5c_JcCWGuP4MdtUvckGQFie?usp=sharing" target="_parent"><img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>

#### 0.실행 환경


google colab 환경에서 실행 가능합니다. 자신의 colab runtime이 GPU에 연결되어야 합니다.


#### 1.Install and Import 단계에서 module import error가 생길 경우


개별 임포트 대신 코드블럭 최상단에서

    !pip install magenta

를 해주세요. 이후 Runtime을 재시작합니다.

#### 2.Record or Upload Audio


하나의 소리가 독립적으로 재생되는 음원 파일을 input으로 넣어야 합니다. 여러가지 소리가 혼합되어있을 경우 음색 변환이 제대로 이루어지지 않을 수 있습니다.

#### 3.Load a model


train된 모델 목록에서 원하는 악기를 선택할 수 있습니다.

#### 4.Modify conditioning


별도로 조정하지 않아도 괜찮습니다.

#### 5.Resynthesize Audio


변환 결과물을 colab 내부에서 스트리밍 형태로 들어볼 수 있습니다.

