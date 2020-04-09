# TwitchEmojiDownloader <img src="https://img.shields.io/static/v1?label=code&message=Python3&color=orange" alt="">

Twitch Emoji Downloader는 트위치 스트리머의 이모티콘을 다운로드하는 프로그램입니다.<br>
**이 프로그램은 Python 3.6+버전이 필요합니다.**

## 목차
- [설치방법](#설치방법)
- [사용방법](#사용방법)
- [문의](#문의)

### 설치방법 
**Git** <code>git clone https://github.com/Kwabang/TwitchEmojiDownloader.git</code><br>
**releases** <code>https://github.com/Kwabang/TwitchEmojiDownloader/releases</code>

### 사용방법
1. requests 모듈설치 <code>pip install requests</code>
2. exmaple_config.json을 config.json으로 변경
3. 트위치 개발자 콘솔에서 API Client_ID 발급후 config.json에 입력<br />
  -참고자료 : https://docs.aws.amazon.com/ko_kr/lumberyard/latest/userguide/chatplay-generate-twitch-client-id.html
4. app.py 실행 <code>python3 app.py</code>
5. 다운로드할 스트리머의 ID입력 ex) <code>다운로드를 원하는 스트리머의 ID를 입력해주세요. : **twitchkr**</code>

### 문의
[이메일](mailto:kwabang2827@gmail.com) 또는 [디스코드](https://discordapp.com/invite/z8UBtjp)로 문의를 넣을 수 있습니다.
