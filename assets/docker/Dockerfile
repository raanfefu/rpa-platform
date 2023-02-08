FROM ubuntu:rolling

USER root 

RUN apt -y update \
    &&  apt upgrade \
    && apt -y install sudo software-properties-common \
    && add-apt-repository ppa:deadsnakes/ppa

RUN apt -y install python-is-python3 nodejs npm unzip curl vim && \
    apt-get -y install python3-pip libnss3 libnspr4  libgbm1 libasound2 libdbus-glib-1-2

RUN pip3 install -U robotframework robotframework-browser

VOLUME [ "/robot-dir/data", "/robot-dir/scripts", "/robot-dir/results" ]

RUN rfbrowser init 

COPY docker-entrypoint.sh /

ENTRYPOINT [ "/docker-entrypoint.sh" ]

