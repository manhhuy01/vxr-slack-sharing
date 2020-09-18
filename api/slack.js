import _ from 'lodash'
import moment from 'moment'
import axios from 'axios'
import {
    CHANNELS, MAX_SCORE_SHARING_WEEK,
    SCORE_SHARING, MAX_SCORE_INTERACTIVE_WEEK,
    SCORE_INTERACTIVE,
    TOKEN
} from '../constants';

/*
{
  "client_msg_id": "2866c9bc-5539-4105-bff9-0a03df516c3f",
  "type": "message",
  "text": "<https://medium.com/better-programming/5-front-end-predictions-and-trends-for-2020-afc949e0eba2>\nnhững xu hướng cần để mắt tới",
  "user": "UC9G70F54",
  "ts": "1591614174.005500",
  "team": "T6YPB58N6",
  "attachments": [
      {
          "service_name": "Medium",
          "title": "5 Front-End Predictions and Trends for 2020",
          "title_link": "https://medium.com/better-programming/5-front-end-predictions-and-trends-for-2020-afc949e0eba2",
          "text": "How to embrace them and some helpful resources to be prepared",
          "fallback": "Medium: 5 Front-End Predictions and Trends for 2020",
          "image_url": "https://miro.medium.com/max/1200/1*DVetG_IvUoIOxTi-fdQpEQ.jpeg",
          "fields": [
              {
                  "title": "Reading time",
                  "value": "4 min read",
                  "short": true
              }
          ],
          "ts": 1577052376,
          "from_url": "https://medium.com/better-programming/5-front-end-predictions-and-trends-for-2020-afc949e0eba2",
          "image_width": 375,
          "image_height": 250,
          "image_bytes": 359066,
          "service_icon": "https://cdn-images-1.medium.com/fit/c/152/152/1*8I-HPL0bfoIzGied-dzOvA.png",
          "id": 1,
          "original_url": "https://medium.com/better-programming/5-front-end-predictions-and-trends-for-2020-afc949e0eba2"
      }
  ],
  "blocks": [
      {
          "type": "rich_text",
          "block_id": "8Ks",
          "elements": [
              {
                  "type": "rich_text_section",
                  "elements": [
                      {
                          "type": "link",
                          "url": "https://medium.com/better-programming/5-front-end-predictions-and-trends-for-2020-afc949e0eba2"
                      },
                      {
                          "type": "text",
                          "text": "\nnhững xu hướng cần để mắt tới"
                      }
                  ]
              }
          ]
      }
  ],
  "reactions": [
      {
          "name": "heavy_check_mark",
          "users": [
              "UC8KC1E3D",
              "UGHSNQNBU",
              "UM308196W",
              "UCB3HMC14",
              "UCLHQ2B1T"
          ],
          "count": 5
      },
      {
          "name": "+1",
          "users": [
              "UTF9MSGBA",
              "UCB3HMC14"
          ],
          "count": 2
      }
  ]
}
*/
const getConversionHistory = ({ channel, latest, oldest }) => axios({
    url: 'https://vexere.slack.com/api/conversations.history',
    method: 'GET',
    params: {
        channel,
        latest,
        oldest,
    },
    headers: {
        Authorization: `Bearer ${TOKEN}`
    }
})

/*
 {
    "id": "U6YTDJ2UD",
    "team_id": "T6YPB58N6",
    "name": "tung.nguyen",
    "deleted": false,
    "color": "9f69e7",
    "real_name": "Tung Nguyen",
    "tz": "Asia/Bangkok",
    "tz_label": "Indochina Time",
    "tz_offset": 25200,
    "profile": {
        "title": "Head of Platform - IT",
        "phone": "0982551628",
        "skype": "tung.ns",
        "real_name": "Tung Nguyen",
        "real_name_normalized": "Tung Nguyen",
        "display_name": "tung.nguyen",
        "display_name_normalized": "tung.nguyen",
        "fields": null,
        "status_text": "",
        "status_emoji": "",
        "status_expiration": 0,
        "avatar_hash": "4ed3a1190263",
        "image_original": "https://avatars.slack-edge.com/2017-09-09/238639051396_4ed3a11902632a58c38c_original.jpg",
        "is_custom_image": true,
        "email": "tung.nguyen@vexere.com",
        "first_name": "Tung",
        "last_name": "Nguyen",
        "image_24": "https://avatars.slack-edge.com/2017-09-09/238639051396_4ed3a11902632a58c38c_24.jpg",
        "image_32": "https://avatars.slack-edge.com/2017-09-09/238639051396_4ed3a11902632a58c38c_32.jpg",
        "image_48": "https://avatars.slack-edge.com/2017-09-09/238639051396_4ed3a11902632a58c38c_48.jpg",
        "image_72": "https://avatars.slack-edge.com/2017-09-09/238639051396_4ed3a11902632a58c38c_72.jpg",
        "image_192": "https://avatars.slack-edge.com/2017-09-09/238639051396_4ed3a11902632a58c38c_192.jpg",
        "image_512": "https://avatars.slack-edge.com/2017-09-09/238639051396_4ed3a11902632a58c38c_512.jpg",
        "image_1024": "https://avatars.slack-edge.com/2017-09-09/238639051396_4ed3a11902632a58c38c_1024.jpg",
        "status_text_canonical": "",
        "team": "T6YPB58N6"
    },
    "is_admin": true,
    "is_owner": true,
    "is_primary_owner": true,
    "is_restricted": false,
    "is_ultra_restricted": false,
    "is_bot": false,
    "is_app_user": false,
    "updated": 1504928868
},
*/
const getAllUser = () => axios({
    url: 'https://vexere.slack.com/api/users.list',
    method: 'GET',
    headers: {
        Authorization: `Bearer ${TOKEN}`
    }
})




const PERSON = {
    id: 'abc',
    name: '',
    postSharing: 0,
    postValid: 0,
    reactsAndRepliesFromOthers: 0,
    posts: [],
    reply: 0,
    reaction: 0,
    interactive: 0,
    interactivePoint: 0,
    sharingPoint: 0,
    totalPoint: 0,
}

const createDataByPost = (post) => {
    let data = {};
    const isPostIncludedLink = (post) => post.attachments || (post.text && post.text.includes('https:') || (post.text && post.text.includes('http:')));
    const isMoreThan2Reaction = (post) => (post.reply_users && post.reply_users.filter(user => user != post.user).length > 1);
    const isMoreThan2Reply = (post) => (post.reactions && _.flatten(post.reactions.map(x => x.users)).filter(x => x != post.user).length > 1);
    const getReactionsAndRepliesFromOthers = (post) => {
        let count = 0;
        if (post.reply_count) {
            count += post.reply_users.filter(x => x != post.user).length;
        }
        if (post.reactions) {
            count += _.flatten(post.reactions.map(x => x.users)).filter(x => x != post.user).length;
        }
        return count;
    }

    if (isPostIncludedLink(post)) {
        data[post.user] = data[post.user] || { ..._.cloneDeep(PERSON), id: post.user, time: post.ts }
        data[post.user].name = _.get(post, "user_profile.name");
        data[post.user].postSharing += 1;
        data[post.user].reactsAndRepliesFromOthers += getReactionsAndRepliesFromOthers(post);
        if (isMoreThan2Reaction(post) || isMoreThan2Reply(post)) {
            data[post.user].postValid += 1;
            data[post.user].posts.push(post.text)
        }

        const reply_users = _.get(post, 'replies', []).map(x => x.user).filter(x => x != post.user);
        reply_users.forEach(user => {
            data[user] = data[user] || { ..._.cloneDeep(PERSON), id: user, time: post.ts };
            data[user].reply += 1;
            data[user].interactive += 1;
        });

        const reaction_users = _.flatten(_.get(post, 'reactions', []).map(x => x.users)).filter(x => x != post.user);
        reaction_users.forEach(user => {
            data[user] = data[user] || { ..._.cloneDeep(PERSON), id: user, time: post.ts };
            data[user].reaction += 1;
            data[user].interactive += 1;
        });
    }

    return data;
}

const groupByUserFromPosts = (postData) => {
    let result = {}
    postData.forEach(data => {
        _.keys(data).forEach(userId => {
            result[userId] = result[userId] || [];
            result[userId].push(data[userId]);
        })
    })
    return result;
}


const createDataByDate = (userData) => {
    let result = {}
    userData.forEach(data => {
        let date = new Date(data.time * 1000);
        let formatDate = moment(date).format('YYYY-MM-DD');
        if (result[formatDate]) {
            result[formatDate].postSharing += data.postSharing;
            result[formatDate].postValid += data.postValid;
            result[formatDate].reply += data.reply;
            result[formatDate].reaction += data.reaction;
            result[formatDate].interactive += data.interactive;
            result[formatDate].reactsAndRepliesFromOthers += data.reactsAndRepliesFromOthers;
        } else {
            result[formatDate] = data
        }

    })
    return result
}

const groupDataUserByDate = (dataGroupByUser) => {
    let rs = {}
    _.keys(dataGroupByUser).map(userId => rs[userId] = createDataByDate(dataGroupByUser[userId]))
    return rs;
}

const groupDataUserByWeek = (userDataGroupByDate) => {
    let dataGroupByUserByWeek = {}
    _.keys(userDataGroupByDate).forEach(userId => {
        let dataGroupByWeek = {}
        _.keys(userDataGroupByDate[userId]).forEach(date => {
            
            const data = userDataGroupByDate[userId][date];
            const numOfWeek = moment(date, 'YYYY-MM-DD').get('w');
            if (dataGroupByWeek[numOfWeek]) {
                dataGroupByWeek[numOfWeek].postSharing += data.postSharing;
                dataGroupByWeek[numOfWeek].postValid += data.postValid;
                dataGroupByWeek[numOfWeek].reply += data.reply;
                dataGroupByWeek[numOfWeek].reaction += data.reaction;
                dataGroupByWeek[numOfWeek].interactive += data.interactive;
                dataGroupByWeek[numOfWeek].reactsAndRepliesFromOthers += data.reactsAndRepliesFromOthers;
            } else {
                dataGroupByWeek[numOfWeek] = data
            }
        })
        dataGroupByUserByWeek[userId] = dataGroupByWeek;
    })

    return dataGroupByUserByWeek
}

const calPointByUser = (dataGroupByWeek) => {
    let result = {
        sharingPoint: 0,
        interactivePoint: 0,
        totalPoint: 0,
    }

    _.keys(dataGroupByWeek).forEach(week => {
        result.sharingPoint += _.min([dataGroupByWeek[week].postValid * SCORE_SHARING, MAX_SCORE_SHARING_WEEK]);
        result.interactivePoint += _.min([dataGroupByWeek[week].interactive * SCORE_INTERACTIVE, MAX_SCORE_INTERACTIVE_WEEK]);
    })
    result.totalPoint = result.sharingPoint + result.interactivePoint;
    return result;
}

const calPointAllUser = (dataGroupByUserByWeek) => {
    return _.keys(dataGroupByUserByWeek).map(userId => ({ ...calPointByUser(dataGroupByUserByWeek[userId]), userId }))
}

const getUserInfo = (points, members) => points.map(x => ({
    ...x,
    name: members.find(mem => mem.id == x.userId).name,
}))


export const calculateCurrentPoint = async (oldest, latest = new Date()) => {
    let latestDate = new Date(latest);
    let oldestDate = new Date(oldest);
    const [{ data: { members } }, { data: { messages } }] = await Promise.all([
        getAllUser(),
        getConversionHistory({ channel: CHANNELS.SHARING, latest: latestDate.getTime() / 1000, oldest: oldestDate.getTime() / 1000 })
    ]);
    const postData = messages.map(createDataByPost);
    // console.log(postData.length)
    const dataGroupByUser = groupByUserFromPosts(postData);
    const dataGroupByUserByDate = groupDataUserByDate(dataGroupByUser)
    const dataGroupByUserByWeek = groupDataUserByWeek(dataGroupByUserByDate);
    const points = calPointAllUser(dataGroupByUserByWeek);
    const pointWithUser = getUserInfo(points, members);
    return {
        pointWithUser,
        dataGroupByUserByDate,
        dataGroupByUserByWeek,
        members,
    }

}
