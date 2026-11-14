// 原创中文循环文游《再赴晚风》。剧情状态仅由声明式节点、记忆与本轮标记构成。
export const MEMORIES = {
  "invitation": {
    "title": "她改过的邀约",
    "body": "19:07 的消息原本是“能帮我一个忙吗”，撤回后成了“能陪我走一趟吗”。林夏要的首先是陪伴，不是有人替她处理一切。",
    "category": "人物"
  },
  "bell_time": {
    "title": "停在 21:17 的钟",
    "body": "21:17 是钟楼线路切换的固定时间。钟声之前，维修通道的蓝灯先闪三次；黑暗与落下的隔离帘都可以提前准备。",
    "category": "时间"
  },
  "taste": {
    "title": "现在的林夏",
    "body": "她已经三年不喝加糖奶茶，雨夜会点温水。记得以前的她，不代表已经听见现在的她。",
    "category": "人物"
  },
  "companion": {
    "title": "把决定还给她",
    "body": "林夏不是来证明自己不害怕。她想亲手取回父亲的胶片，也愿意接受帮助，但希望有人问她要怎么走。",
    "category": "人物"
  },
  "locker": {
    "title": "车站 C17 寄存柜",
    "body": "旧站的摄影展寄存柜 C17 还留着林远川的工作袋。凭林夏的号码牌可以领取，柜门内侧另有一张纸条。",
    "category": "地点"
  },
  "archive": {
    "title": "档案索引 A-17",
    "body": "林远川的“老街夜间测绘”归入 A-17，公开副本查询码是 0717。原签收单与停移通知被分开收录，必须按同一编号查找。",
    "category": "地点"
  },
  "blue_route": {
    "title": "东侧蓝线通道",
    "body": "沿旧站到钟楼东侧的蓝色检修标记走，可绕开积水的主楼梯。到达后应先让值守人员确认，再由两人同行。",
    "category": "地点"
  },
  "pair_release": {
    "title": "需要两个人的手柄",
    "body": "钟楼隔离帘的手动释放杆必须持续按住。一个人留在安全线外压杆，另一个人才能取出灯箱下的铁盒；不能用物品卡住弹簧。",
    "category": "地点"
  },
  "letter": {
    "title": "没有寄出的那封信",
    "body": "父亲写道：“你不欠这条街一个留下来的承诺。想走就走，想回就回。那天没拍完的照片，等你愿意，我们再拍。”",
    "category": "人物"
  },
  "hold_order": {
    "title": "胶片不在清运清单里",
    "body": "A-17 停移通知明确要求影像原件移交城市档案馆，钟楼灯箱的铁盒不属于建筑清运物。出示带编号副本并联系陈工，可请值守员见证交接。",
    "category": "真相"
  },
  "blank_frame": {
    "title": "第 25 格的留白",
    "body": "旧相机的计数窗总停在 24 与 25 之间。林远川在手册上写“别替另一个人站好位置”，空白的下一格在等一张由两个人共同决定的照片。",
    "category": "真相"
  },
  "shared_exposure": {
    "title": "不是再救她一次",
    "body": "取回铁盒并不自动结束循环。相机上两根快门线可以由两个人共同按下。先把未寄出的信读完，再让林夏自己选择是否完成那张合照。",
    "category": "真相"
  }
};

export const ENDINGS = {
  "missed": {
    "title": "错过的晚风",
    "subtitle": "有些离开，发生在事情开始以前。",
    "description": "我把邀约当作一个可以推迟的请求。钟声响起时，那个尚未说出口的问题仍停在聊天框里。",
    "type": "regret",
    "scene": "rain-street"
  },
  "glass": {
    "title": "隔着玻璃",
    "subtitle": "我留下了她，却没问她想留下什么。",
    "description": "林夏平安坐在咖啡店里。我们之间隔着一杯变凉的水，还有一次被我代替的选择。",
    "type": "regret",
    "scene": "cafe"
  },
  "alarm": {
    "title": "无人相信的预告",
    "subtitle": "知道结局，不等于已经说清来路。",
    "description": "我说出了准确的时间，却拿不出过程。钟楼的危机得到处置，我们仍没能一起走进去。",
    "type": "regret",
    "scene": "clocktower"
  },
  "solo": {
    "title": "一个人的合照",
    "subtitle": "我努力填满所有位置，唯独没有留下她的位置。",
    "description": "我想独自扳动手柄，也想独自承担后果。有人及时拉我退回安全线，铁盒仍留在隔离帘后。",
    "type": "regret",
    "scene": "clocktower"
  },
  "paper": {
    "title": "留住一条街",
    "subtitle": "一份副本改变了明天，今晚的话还没有说完。",
    "description": "停移通知被重新确认，影像原件会由档案馆接收。这是值得庆祝的进展，但我仍把一场重逢办成了一次交接。",
    "type": "hope",
    "scene": "archive"
  },
  "film": {
    "title": "底片未眠",
    "subtitle": "珍贵的东西回到了手中，沉默仍在两个人之间。",
    "description": "我们合力取回了铁盒。林夏抱着它站在雨里，而我还在替她解释父亲、老街，以及她应该怎样生活。",
    "type": "hope",
    "scene": "clocktower"
  },
  "promise": {
    "title": "再约一次",
    "subtitle": "这一次我们终于站在一起，只差一句真正的邀请。",
    "description": "我们取回胶片，也读懂了那封信。旧相机却仍停在最后一格。林夏发现两根快门线：也许这张照片不该由一个人决定。",
    "type": "hope",
    "scene": "clocktower"
  },
  "dawn": {
    "title": "第 25 张照片",
    "subtitle": "没有人替另一个人决定，明天终于到来。",
    "description": "我们一起按下快门，听见胶片走过最后一格。天亮后，林夏选择去远方的学校，我选择替她保管这条街的新照片；下一次见面，已经不是补偿。",
    "type": "true",
    "scene": "dawn"
  }
};

export const STORY = {
  "start": "arrival",
  "nodes": {
    "arrival": {
      "scene": "rain-street",
      "time": "19:07",
      "speaker": "旁白",
      "text": [
        "雨把老街的霓虹揉成一条条细线。我在便利店屋檐下收起工作消息，手机刚好震了一下。",
        "林夏的名字浮在屏幕上。我们上一次单独见面，已经是三年前；我还记得她说“以后再说”时很轻的声音。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "打开林夏的消息",
          "to": "message"
        },
        {
          "label": "先看看街口的旧相机",
          "to": "camera_start"
        },
        {
          "label": "告诉她今晚太忙了",
          "to": "decline"
        }
      ],
      "inspect": [
        {
          "label": "查看手机时间",
          "text": "19:07。雨势很大，晚高峰还没有结束。消息下面有一行几乎被我忽略的小字：对方撤回了一条消息。",
          "memory": [
            "invitation"
          ]
        }
      ]
    },
    "message": {
      "scene": "rain-street",
      "time": "19:08",
      "speaker": "林夏",
      "text": [
        "“你还在这附近吗？能陪我走一趟吗。”",
        "她又发来一张照片：旧钟楼沉在雨里，脚手架围住半边墙。最下面是一句迟到的补充：“我爸留了几卷胶片。明天这边要清场，我想今晚取回来。”"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "答应见面，问她现在在哪里",
          "to": "meet_reply"
        },
        {
          "label": "问她为什么突然找我",
          "to": "why_me"
        },
        {
          "label": "查看那条撤回消息的预览",
          "to": "message_changed"
        }
      ]
    },
    "message_changed": {
      "scene": "rain-street",
      "time": "19:09",
      "speaker": "我",
      "text": [
        "通知预览还在。她先写的是“能帮我一个忙吗”，撤回以后，把“帮”换成了“陪”。",
        "我盯着那两个字看了一会儿。以前我总说，只要能解决问题，怎么说都一样。今晚这句话忽然显得没有那么可靠。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "回复：“我来。你想先去哪？”",
          "to": "meet_reply"
        },
        {
          "label": "回复：“交给我，我替你办。”",
          "to": "fix_reply"
        }
      ],
      "memory": [
        "invitation"
      ]
    },
    "camera_start": {
      "scene": "rain-street",
      "time": "19:08",
      "speaker": "旁白",
      "text": [
        "帆布袋里的旧相机是林夏父亲借给我的。黑色机身磨掉了漆，我一直没找到合适的机会还回去。",
        "相机没有电池，指针却在细雨声里轻轻动了一下。计数窗卡在 24 和 25 之间，像一句到了句号前又停住的话。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "把相机带上，再读消息",
          "to": "message"
        },
        {
          "label": "试着按一下快门",
          "to": "camera_click"
        }
      ],
      "inspect": [
        {
          "label": "摸摸快门线接口",
          "text": "机身右侧有两个相同的小接口。一根快门线绕在袋底，另一根暂时不见了。镜头盖上粘着一小片旧相纸。"
        }
      ]
    },
    "camera_click": {
      "scene": "rain-street",
      "time": "19:09",
      "speaker": "我",
      "text": [
        "快门按到底，只有很轻的一声空响。镜头里映出一张空长椅，明明街口并没有长椅。",
        "我把它当作镜片进水，擦了擦，却在指腹闻到从前照相馆里才有的药水味。手机又震了一下，把我拉回雨夜。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "先去见林夏",
          "to": "meet_reply"
        }
      ]
    },
    "why_me": {
      "scene": "rain-street",
      "time": "19:10",
      "speaker": "林夏",
      "text": [
        "她打来电话。背景里有杯碟相碰的声音：“因为那台相机还在你那里。还有……那天走之前，有些话没来得及说。”",
        "我想问“哪一天”，又听见她笑了一下：“不是现在考你记性。晚风咖啡，我等你。别跑，路滑。”"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "说自己带着相机，很快到",
          "to": "meet_reply"
        },
        {
          "label": "提前承诺帮她把一切都办好",
          "to": "fix_reply"
        }
      ]
    },
    "fix_reply": {
      "scene": "rain-street",
      "time": "19:11",
      "speaker": "我",
      "text": [
        "我打了一长串计划：找管理员、叫车、找搬运的人。最后加上“你不用担心，我来处理”。",
        "她的“正在输入”出现了很久，最后只剩一个“好”。我把这个字当作安心，没去想它也可能是把话重新咽回去。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "走向晚风咖啡",
          "to": "cafe_arrive",
          "flags": [
            "takeover"
          ]
        },
        {
          "label": "补一句：“先听你说说，好吗？”",
          "to": "meet_reply"
        }
      ]
    },
    "meet_reply": {
      "scene": "rain-street",
      "time": "19:12",
      "speaker": "我",
      "text": [
        "我回她：“相机也带着。我来找你，你想怎么走，我们见面再说。”",
        "她发来一把墨绿色雨伞的照片：“我在靠窗的位置。对了，今天没有谁欠谁一个人情。”街口红灯亮着，我终于把脚步放慢了。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "等绿灯，走进咖啡店",
          "to": "cafe_arrive"
        }
      ]
    },
    "decline": {
      "scene": "rain-street",
      "time": "19:10",
      "speaker": "我",
      "text": [
        "“今晚实在有点忙，改天行吗？”我把消息发出去，立刻得到一个“没关系”。",
        "雨一直下。我在办公室回完邮件，叫到车，又在车里想起她很少主动找人。等我重新点开对话框，已经是 21:17。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "拨通那个一直没拨的电话",
          "to": "end_missed"
        }
      ]
    },
    "end_missed": {
      "scene": "rain-street",
      "time": "21:17",
      "speaker": "旁白",
      "text": [
        "电话接通了。林夏说人没事，钟楼停电，她在值守室等下一班车；胶片暂时取不出来了。她让我别再赶过去。",
        "那一刻，袋中的相机突然响了一声。雨滴悬在车窗外，所有灯光收成一个细小的白点。我低头时，手机重新亮起：19:07。"
      ],
      "mood": "calm",
      "choices": [],
      "ending": "missed"
    },
    "cafe_arrive": {
      "scene": "cafe",
      "time": "19:22",
      "speaker": "旁白",
      "text": [
        "晚风咖啡的门铃还是旧声音。林夏坐在窗边，短黑发被雨压得微微翘起，墨绿外套下面是米白色的衣领。她看见我，先把旁边的椅子拉开。",
        "我看见她眼睛里的琥珀色，也看见眼下的疲倦。三年好像只隔了一扇门，又好像远得需要重新认识。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "习惯性替她点一杯加糖奶茶",
          "to": "old_order"
        },
        {
          "label": "问她今天想喝什么",
          "to": "ask_drink"
        },
        {
          "label": "先把旧相机放在桌上",
          "to": "camera_table"
        }
      ]
    },
    "old_order": {
      "scene": "cafe",
      "time": "19:24",
      "speaker": "林夏",
      "text": [
        "“温水就好。我三年前就不太喝甜的了。”她没有责怪我，反倒替我的尴尬找了台阶，“那杯你喝吧，别浪费。”",
        "奶茶端上来，杯壁很暖。我这才发现，自己一路带来的“我知道你”，大半已经是过期的地图。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "承认自己记住的是从前的她",
          "to": "ask_now",
          "flags": [
            "heard_now"
          ]
        },
        {
          "label": "笑着说她果然还是爱逞强",
          "to": "misread"
        }
      ],
      "memory": [
        "taste"
      ]
    },
    "ask_drink": {
      "scene": "cafe",
      "time": "19:24",
      "speaker": "林夏",
      "text": [
        "“温水。”她顿了一下，“是不是和你记得的不一样？我现在喝咖啡也不加糖，熬夜少了，脾气……可能没有少。”",
        "她笑起来的时候，桌上很久没有被人触碰的旧相机，似乎也安静了一点。"
      ],
      "mood": "smile",
      "choices": [
        {
          "label": "问问这三年她过得怎么样",
          "to": "ask_now",
          "flags": [
            "heard_now"
          ]
        },
        {
          "label": "把话题转回胶片",
          "to": "camera_table"
        }
      ],
      "memory": [
        "taste"
      ]
    },
    "ask_now": {
      "scene": "cafe",
      "time": "19:27",
      "speaker": "我",
      "text": [
        "我说：“我可能得重新认识一下现在的你。今晚先从温水开始。”",
        "她把手从杯沿放下来，告诉我自己刚收到一所外地修复学校的录取通知。她想学影像保存，但每次准备答复，都会想起没取回来的那些胶片。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "问她希望今晚完成什么",
          "to": "her_goal"
        },
        {
          "label": "说去外地很好，让她别管旧事",
          "to": "quick_advice"
        }
      ]
    },
    "misread": {
      "scene": "cafe",
      "time": "19:27",
      "speaker": "林夏",
      "text": [
        "她看着窗外：“嗯，你总能很快替我总结。”",
        "我想起很多年前争吵结束时，自己也说过“你就是这样”。那句话很省力，像把一个活着的人塞回我熟悉的抽屉。"
      ],
      "mood": "worried",
      "choices": [
        {
          "label": "停下来，认真问她现在的想法",
          "to": "her_goal"
        },
        {
          "label": "继续安排今晚的行动",
          "to": "push_plan"
        }
      ]
    },
    "quick_advice": {
      "scene": "cafe",
      "time": "19:29",
      "speaker": "林夏",
      "text": [
        "“我知道外面很好。但这是我自己的告别，我想亲自做完。”",
        "她指了指相机：“我爸去世前留了很多东西。我没有每样都收好，也没有一直守着这条街。可这不等于我就不在乎。”"
      ],
      "mood": "worried",
      "choices": [
        {
          "label": "请她决定我们下一步怎么做",
          "to": "her_goal"
        },
        {
          "label": "说最重要的是她安全，其他交给我",
          "to": "push_plan"
        }
      ]
    },
    "camera_table": {
      "scene": "cafe",
      "time": "19:26",
      "speaker": "林夏",
      "text": [
        "她拿起相机，动作轻得像碰一只睡着的鸟。“他总说，拍照不是把人留住，是记住人愿意站在哪里。”",
        "背带上缠着一个寄存号码牌：C17。她说这是旧站摄影展留下的工作袋，今天最后一个值班夜；铁盒里的胶片则还在钟楼灯箱下面。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "问为什么父亲把东西分在两处",
          "to": "two_places"
        },
        {
          "label": "问她想亲自取回什么",
          "to": "her_goal"
        },
        {
          "label": "记下寄存柜号码",
          "to": "locker_note"
        }
      ],
      "memory": [
        "locker"
      ]
    },
    "two_places": {
      "scene": "cafe",
      "time": "19:30",
      "speaker": "林夏",
      "text": [
        "“老街摄影展撤展时，纸质资料先搬去旧站，灯箱一直没拆。爸爸那阵子住院，后来……”她没有把后半句说完。",
        "“这些年我在整理他的东西。每整理一件，都像有人问我：既然这么想他，当时为什么要走？”她说到这里，才第一次没有看相机。"
      ],
      "mood": "worried",
      "choices": [
        {
          "label": "说离开和想念可以同时存在",
          "to": "her_goal"
        },
        {
          "label": "说她父亲肯定不怪她，尽快出发吧",
          "to": "push_plan"
        }
      ]
    },
    "locker_note": {
      "scene": "cafe",
      "time": "19:31",
      "speaker": "我",
      "text": [
        "C17 的号码牌背后写着“展览资料，请交本人或家属”。林夏已经提前联系过值班员，不需要我冒充谁，也不需要一场轰轰烈烈的闯入。",
        "她把号码牌递给我看，又收回手心：“我想自己领。你帮我记得看一眼柜门里面，好像还有东西。”"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "把这件小事记在心里",
          "to": "her_goal"
        }
      ],
      "memory": [
        "locker"
      ]
    },
    "her_goal": {
      "scene": "cafe",
      "time": "19:35",
      "speaker": "林夏",
      "text": [
        "“我想拿到胶片，看看他到底拍了什么。也想知道，他有没有真的生过我的气。”",
        "“你可以陪我，但别替我道歉，别替我跟他说我以后再也不走了。”她说完，像终于从胸口挪开一把很旧的椅子。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "答应让她决定，也让她接受我的帮助",
          "to": "agree_companion",
          "flags": [
            "trust"
          ]
        },
        {
          "label": "说今晚不要冒险，劝她留在咖啡店",
          "to": "stay_cafe"
        },
        {
          "label": "告诉她我知道 21:17 会发生什么",
          "to": "foretell",
          "requires": [
            "bell_time"
          ]
        }
      ],
      "memory": [
        "companion"
      ]
    },
    "agree_companion": {
      "scene": "cafe",
      "time": "19:42",
      "speaker": "我",
      "text": [
        "“好。你不用一个人做，我也不会把你的那份决定拿走。”",
        "林夏说我们可以先去旧站、档案室，或钟楼值守处。三处都在步行范围内，但雨越下越大，赶完所有地方并不现实。她拿纸巾在桌上画了一张简单的路图。"
      ],
      "mood": "smile",
      "choices": [
        {
          "label": "听她说说三条路线",
          "to": "route_brief"
        },
        {
          "label": "告诉她我也有一句迟到的道歉",
          "to": "old_apology"
        }
      ]
    },
    "old_apology": {
      "scene": "cafe",
      "time": "19:44",
      "speaker": "我",
      "text": [
        "“三年前我说你去外地就是逃避。那时我以为，只要替你做出一个正确选择，就能证明我在乎。”",
        "她安静了几秒：“我当时也把‘你不懂’说得太快。其实我想说的是，我很害怕，但我还是想去。”窗外有人收伞，我们终于没有急着替彼此收尾。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "约定今晚有话就说清楚",
          "to": "route_brief",
          "flags": [
            "trust",
            "apology"
          ]
        }
      ]
    },
    "push_plan": {
      "scene": "cafe",
      "time": "19:35",
      "speaker": "我",
      "text": [
        "我把路线、时间和备用电话排好，以为只要足够周全，就可以绕过那些难以开口的部分。",
        "林夏听完问：“那我呢？我在你这个计划里，是要做什么的人？”我看着纸上的箭头，才发现没有画她的位置。"
      ],
      "mood": "worried",
      "choices": [
        {
          "label": "收起计划，重新听她说",
          "to": "her_goal"
        },
        {
          "label": "坚持让她在这里等我",
          "to": "stay_cafe"
        },
        {
          "label": "带着相机独自去钟楼",
          "to": "solo_depart"
        }
      ]
    },
    "stay_cafe": {
      "scene": "cafe",
      "time": "19:42",
      "speaker": "林夏",
      "text": [
        "“如果我说我不想在这里等呢？”她的语气很平，反而让我找不到可以反驳的地方。",
        "我说我只是担心她。她点头：“我知道。担心不一定错，可你总是在我回答以前，就把我的回答写好了。”"
      ],
      "mood": "worried",
      "choices": [
        {
          "label": "向她道歉，请她一起决定路线",
          "to": "agree_companion",
          "flags": [
            "trust"
          ]
        },
        {
          "label": "仍坚持让她留下，我去处理",
          "to": "cafe_wait"
        }
      ]
    },
    "cafe_wait": {
      "scene": "cafe",
      "time": "21:10",
      "speaker": "旁白",
      "text": [
        "我联系值守员，确认今晚有恶劣天气，不再进入钟楼。事情似乎得到了最稳妥的处理。林夏也没有出去，我们各自看着自己的手机。",
        "她后来拿出录取信，拍了张照片发给学校。我本可以为她高兴，却忽然意识到，她没有再告诉我任何决定。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "抬头听见 21:17 的钟声",
          "to": "end_glass"
        }
      ]
    },
    "end_glass": {
      "scene": "cafe",
      "time": "21:17",
      "speaker": "旁白",
      "text": [
        "远处的钟楼暗下去，店员打开了应急灯。林夏说：“谢谢你过来。后面的事，我会自己联系。”",
        "我想起“陪”这个字，终于觉得今晚有一部分没有发生。旧相机空响了一声，桌上的温水重新变成了刚端来时的模样。"
      ],
      "mood": "calm",
      "choices": [],
      "ending": "glass"
    },
    "foretell": {
      "scene": "cafe",
      "time": "19:38",
      "speaker": "我",
      "text": [
        "我说出了钟声的时间、蓝灯和隔离帘。话一出口，连我自己也觉得像一场准备过头的恶作剧。",
        "林夏没有笑：“你为什么会知道？如果真的有危险，我们就一起把原因查出来。只给我一个可怕的结论，我不知道该怎么相信你。”"
      ],
      "mood": "worried",
      "choices": [
        {
          "label": "承认自己也不明白，邀请她一起核对",
          "to": "route_brief",
          "flags": [
            "trust"
          ]
        },
        {
          "label": "要求她相信我，不要再去钟楼",
          "to": "alarm_call"
        },
        {
          "label": "从她改过的邀约说起",
          "to": "explain_invitation",
          "requires": [
            "invitation"
          ]
        }
      ]
    },
    "explain_invitation": {
      "scene": "cafe",
      "time": "19:41",
      "speaker": "我",
      "text": [
        "“你把帮忙改成了陪伴，我上一回没有听见。”我把那种难以解释的熟悉感慢慢说完，没有把她当成必须接受结论的人。",
        "她转了转相机的过片杆：“如果真有下一回，请你也记得，我不是只能被你救下的人。”这次，我认真答应。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "从可以核对的小事开始",
          "to": "route_brief",
          "flags": [
            "trust",
            "apology"
          ]
        }
      ],
      "memory": [
        "companion"
      ]
    },
    "alarm_call": {
      "scene": "cafe",
      "time": "19:45",
      "speaker": "旁白",
      "text": [
        "我打给值守室，说 21:17 钟楼会出事。接线人问具体是哪里，什么设备，是否有人受伤；我答不上来，只能不断重复时间。",
        "他们认真记录，也请我不要擅自进入。林夏去窗边给档案馆打电话，而我站在原地，第一次发现准确的预言也可能帮不上忙。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "带着警告直接赶到钟楼",
          "to": "alarm_arrive"
        },
        {
          "label": "回到桌边，一起查证",
          "to": "route_brief",
          "flags": [
            "trust"
          ]
        }
      ]
    },
    "route_brief": {
      "scene": "cafe",
      "time": "19:47",
      "speaker": "林夏",
      "text": [
        "“旧站 C17 有工作袋，档案室有爸爸的展览记录，钟楼值守处能问清怎么取铁盒。”",
        "她在纸上划掉被雨淹住的小巷：“今晚先查一处，再到钟楼碰面。有不清楚的地方，咱们回来问，不靠猜。”她把伞稍微偏向我，自己也往伞下靠了半步。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "去旧站领取工作袋",
          "to": "station_arrive"
        },
        {
          "label": "去档案室查展览资料",
          "to": "archive_arrive"
        },
        {
          "label": "先去钟楼了解现场",
          "to": "tower_early"
        },
        {
          "label": "按已知索引调出电子副本，再去钟楼",
          "to": "remembered_archive",
          "requires": [
            "archive",
            "hold_order"
          ],
          "flags": [
            "copy"
          ]
        },
        {
          "label": "先核对已记住的线索",
          "to": "memory_review"
        }
      ],
      "inspect": [
        {
          "label": "查看她画的地图",
          "text": "晚风咖啡在中心，旧站、档案室、钟楼各占一个角。被雨水封住的是主楼梯旁的小巷，不是整片街区。"
        }
      ]
    },
    "memory_review": {
      "scene": "cafe",
      "time": "19:49",
      "speaker": "我",
      "text": [
        "我把自己已经确定的事写在纸上，把猜测另列一行。某些细节我仿佛见过不止一次，但今晚仍需要重新问、重新确认。",
        "林夏补了一句：“记住我说过什么很好，给我一次再回答的机会也很好。”我们决定带着线索出发，不带着已经替彼此写好的结局。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "去旧站，看看寄存柜",
          "to": "station_arrive"
        },
        {
          "label": "去档案室，核对原始编号",
          "to": "archive_arrive"
        },
        {
          "label": "去钟楼，确认检修通道",
          "to": "tower_early"
        },
        {
          "label": "下载 A-17 副本，节省查档时间",
          "to": "remembered_archive",
          "requires": [
            "archive",
            "hold_order"
          ],
          "flags": [
            "copy"
          ]
        }
      ]
    },
    "station_arrive": {
      "scene": "station",
      "time": "20:02",
      "speaker": "旁白",
      "text": [
        "旧车站已经停运，站厅被改成小展馆。值班的许姨正在把“老街影像展”的牌子翻到背面，看到林夏，先叫了一声她的小名。",
        "林夏把 C17 号码牌放在桌上。许姨检查过预约记录，拿出登记簿：“我还以为你不来了。你爸工作袋里的胶带，都还是我借他的。”"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "让林夏自己签收",
          "to": "station_sign",
          "flags": [
            "trust"
          ]
        },
        {
          "label": "询问工作袋和钟楼铁盒的关系",
          "to": "station_history"
        },
        {
          "label": "查看寄存柜 C17",
          "to": "locker_open",
          "requires": [
            "locker"
          ]
        }
      ]
    },
    "station_sign": {
      "scene": "station",
      "time": "20:04",
      "speaker": "林夏",
      "text": [
        "她一笔一画签下名字，写完后在家属一栏停住。许姨把笔轻轻抽走：“家属不是一份一直不能请假的工作。”",
        "林夏低头笑了一下。我原本准备安慰她，却忽然觉得，这句话留在她自己心里也很好。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "陪她一起打开 C17",
          "to": "locker_open"
        },
        {
          "label": "先请许姨讲讲这次展览",
          "to": "station_history"
        }
      ]
    },
    "station_history": {
      "scene": "station",
      "time": "20:06",
      "speaker": "许姨",
      "text": [
        "“展览撤下时，档案馆先收纸。灯箱还在钟楼，铁盒就留在那里等统一交接。今晚不是赶在拆楼前偷东西，手续本来就该走完。”",
        "她看向林夏：“你爸当年拍这条街，是为了让人知道它怎么活过，不是要谁一辈子住在照片里。”"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "问档案馆怎么检索这批资料",
          "to": "station_index"
        },
        {
          "label": "打开工作袋",
          "to": "locker_open"
        }
      ]
    },
    "locker_open": {
      "scene": "station",
      "time": "20:16",
      "speaker": "旁白",
      "text": [
        "C17 的锁开得很顺。里面有一本接触印样册、一包没有用完的纸巾，还有林远川惯用的蓝色工作袋。",
        "林夏没有立刻翻东西。她先把袋子整个抱了一下，然后才问我：“你能帮我照着这里吗？这盏灯有点暗。”我把手机灯打开。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "照亮袋里的信封",
          "to": "station_letter"
        },
        {
          "label": "先看相机的旧手册",
          "to": "camera_manual"
        },
        {
          "label": "查看柜门内侧",
          "to": "locker_door"
        }
      ],
      "memory": [
        "locker"
      ]
    },
    "locker_door": {
      "scene": "station",
      "time": "20:17",
      "speaker": "我",
      "text": [
        "柜门内侧贴着便签：“远川，灯箱编号 A-17，档案副本 0717。下次别又把名单塞进镜头袋。”末尾画着一只很生气的小乌龟。",
        "许姨看见便签，自己先笑了：“他做事慢，走路也慢。你小时候老嫌他拍一张要等半天。”林夏摸了摸那只乌龟，没有把便签撕下来。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "记下编号，再看信封",
          "to": "station_letter"
        },
        {
          "label": "记下编号，翻开相机手册",
          "to": "camera_manual"
        }
      ],
      "memory": [
        "archive"
      ]
    },
    "station_letter": {
      "scene": "station",
      "time": "20:18",
      "speaker": "林夏",
      "text": [
        "信封上没有收件地址，只写着“给还没想好要不要回来的小夏”。纸页折得很平，像曾被人拿出来，又放回去许多次。",
        "她问我能不能等一等。站厅里只剩雨声，电子钟过了一分钟，她才把信从信封里抽出来。"
      ],
      "mood": "worried",
      "choices": [
        {
          "label": "安静等她读下去",
          "to": "letter_read",
          "flags": [
            "letter_read"
          ]
        },
        {
          "label": "问是否需要我读给她听",
          "to": "letter_permission"
        }
      ]
    },
    "letter_permission": {
      "scene": "station",
      "time": "20:19",
      "speaker": "林夏",
      "text": [
        "她摇头，又很快补充：“不是不信你。我想先听见自己把它读完。”",
        "我说好，把手机灯调暗一些。她吸了一口气，读起第一行，声音没有想象中那么稳，也没有停下来。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "陪她读完",
          "to": "letter_read",
          "flags": [
            "trust",
            "letter_read"
          ]
        }
      ]
    },
    "letter_read": {
      "scene": "station",
      "time": "20:20",
      "speaker": "林夏",
      "text": [
        "“你不欠这条街一个留下来的承诺。想走就走，想回就回。以前我说舍不得，是我自己的舍不得，不是让你负责。”",
        "“那天没拍完的照片，等你愿意，我们再拍。要是我慢得赶不上，也别为等我错过你的车。多看看外面的光，回来讲给我听。”"
      ],
      "mood": "worried",
      "choices": [
        {
          "label": "问她听完以后想做什么",
          "to": "letter_after"
        },
        {
          "label": "说父亲已经替她安排好了答案",
          "to": "letter_interpret"
        }
      ],
      "memory": [
        "letter"
      ]
    },
    "letter_after": {
      "scene": "station",
      "time": "20:22",
      "speaker": "林夏",
      "text": [
        "她把纸沿着原折痕收好：“我还是想取胶片。但不是去领一份我欠他的账了。”",
        "“还有，我想接受那份录取。不是为了替他，也不是为了证明我已经放下。我就是想学。”她眼里有泪，嘴角却往上弯了一点。我说，那我们就把今晚的事做完，再一起找最近的寄件点。"
      ],
      "mood": "smile",
      "choices": [
        {
          "label": "看看手册里没拍完的照片",
          "to": "camera_manual",
          "flags": [
            "trust"
          ]
        },
        {
          "label": "带着信出发去钟楼",
          "to": "station_pack",
          "flags": [
            "trust",
            "second_cable"
          ]
        }
      ]
    },
    "letter_interpret": {
      "scene": "station",
      "time": "20:21",
      "speaker": "我",
      "text": [
        "我差点脱口而出“所以你应该走”。话到嘴边，林夏先问：“你看，连一封劝我自己决定的信，也快要变成你替我决定的理由了。”",
        "她不是生气，只是疲倦。我把那句没说完的话收回去：“那你想怎么做？”"
      ],
      "mood": "worried",
      "choices": [
        {
          "label": "这次等她自己回答",
          "to": "letter_after",
          "flags": [
            "trust"
          ]
        },
        {
          "label": "转而检查相机",
          "to": "camera_manual"
        }
      ]
    },
    "camera_manual": {
      "scene": "station",
      "time": "20:22",
      "speaker": "旁白",
      "text": [
        "手册最后夹着一张印样：少年时的林夏站在画面左边，右边空着一个位置，远处旧钟楼指向 21:17。",
        "下面是林远川的字：“那天她赶车，我让她站好，她说回头再拍。我没有听见‘回头’，只听见了‘走’。第 25 格留着，别替另一个人站好位置。”"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "检查手册上的双快门线图",
          "to": "two_releases"
        },
        {
          "label": "把印样交给林夏",
          "to": "blank_talk"
        }
      ],
      "memory": [
        "blank_frame"
      ]
    },
    "two_releases": {
      "scene": "station",
      "time": "20:22",
      "speaker": "我",
      "text": [
        "图上不是复杂的机关：两根快门线接在同一个联动座上，一根负责预压，另一根完成释放。父亲做过这种装置，好让被拍的人也能决定按下快门的时刻。",
        "袋底还有另一根线。许姨说，这是展览互动装置的一部分，林远川总觉得拍合照的人不该永远缺席。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "把第二根线收好",
          "to": "blank_talk",
          "flags": [
            "second_cable"
          ]
        },
        {
          "label": "先把装置拍照留存",
          "to": "station_pack",
          "flags": [
            "second_cable"
          ]
        }
      ]
    },
    "blank_talk": {
      "scene": "station",
      "time": "20:24",
      "speaker": "林夏",
      "text": [
        "“那天我不是不想拍。”她说，“我是怕再晚一点，他又会说今天别走了。我以为先离开，才能保住自己的决定。”",
        "我把相机放在她手里。她试了试过片杆，仍然卡在 24 和 25 之间：“也许有些话不用回去重说。我们现在听见，也还来得及。”"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "一起整理好工作袋",
          "to": "station_pack",
          "flags": [
            "trust",
            "second_cable"
          ]
        }
      ]
    },
    "station_index": {
      "scene": "station",
      "time": "20:10",
      "speaker": "许姨",
      "text": [
        "许姨在登记簿上找到一串编号：“A-17。公开副本查询码是 0717。别只搜拆除公示，停移通知和原件签收单是另外归档的。”",
        "林夏把号码念了一遍，记到手机里。许姨把雨衣递过来：“知道为什么去，比走得快有用。”"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "领出工作袋",
          "to": "locker_open"
        },
        {
          "label": "用号码在手机上查档",
          "to": "station_remote",
          "flags": [
            "copy"
          ]
        }
      ],
      "memory": [
        "archive"
      ]
    },
    "station_remote": {
      "scene": "station",
      "time": "20:16",
      "speaker": "我",
      "text": [
        "手机网页转了几圈，显示出展览目录与一份完整签收单。A-17 的原件属于市民捐赠影像，须移交档案馆，不列入建筑清运。",
        "我把带编号的副本保存到离线文件，林夏联系了登记人陈工。对方答应通知钟楼值守员，并提醒我们先确认检修路线。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "回去领工作袋，再出发",
          "to": "locker_open"
        },
        {
          "label": "已经读过那封信，直接取线去钟楼",
          "to": "station_pack",
          "requires": [
            "letter",
            "blank_frame"
          ],
          "flags": [
            "second_cable",
            "letter_read"
          ]
        }
      ],
      "memory": [
        "hold_order"
      ]
    },
    "station_pack": {
      "scene": "station",
      "time": "20:28",
      "speaker": "旁白",
      "text": [
        "许姨替信封套上防水袋，又确认了林夏的签收信息。工作袋里的第二根快门线也被我们找到，绕好放进相机袋。",
        "我们离开时，她从门里喊：“取不出来也别硬闯，纸上的手续不会过了今晚就消失。”林夏回头说好，这一次像是真的听进去了。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "沿普通道路去钟楼碰面",
          "to": "rendezvous"
        },
        {
          "label": "按记忆里的 A-17 下载交接依据",
          "to": "mobile_copy",
          "requires": [
            "archive",
            "hold_order"
          ],
          "flags": [
            "copy"
          ]
        },
        {
          "label": "向林夏复述查过的停移通知",
          "to": "mobile_copy",
          "requires": [
            "hold_order"
          ],
          "flags": [
            "copy"
          ]
        }
      ]
    },
    "archive_arrive": {
      "scene": "archive",
      "time": "20:01",
      "speaker": "旁白",
      "text": [
        "社区档案室还亮着两盏灯。墙上贴着明天的清场说明，桌边却坐着一位正在修书页的年轻档案员，并没有谁等着扮演阻拦我们的人。",
        "“林远川的资料？”她听完来意，把椅子拉过来，“先看目录。很多东西没丢，只是分在不同卷里了。”"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "从展览目录慢慢查起",
          "to": "archive_catalog"
        },
        {
          "label": "直接报 A-17 与查询码 0717",
          "to": "archive_index_known",
          "requires": [
            "archive"
          ]
        },
        {
          "label": "先问明天究竟会搬走什么",
          "to": "archive_public_notice"
        }
      ]
    },
    "archive_catalog": {
      "scene": "archive",
      "time": "20:05",
      "speaker": "我",
      "text": [
        "目录里有城墙、旧桥、夜市、钟楼。我翻过一张张图，发现林远川拍的很少是“景点”，倒是修鞋的手、收摊后的水痕、等最后一班车的人。",
        "林夏认出一张照片里的自己：“原来我站在这里。他说要拍我，我一直以为他又在拍街。”照片下方印着 A-17。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "用 A-17 找原始签收单",
          "to": "archive_sign",
          "flags": [
            "copy"
          ]
        },
        {
          "label": "继续看林远川的备注",
          "to": "archive_margin"
        }
      ],
      "memory": [
        "archive"
      ]
    },
    "archive_index_known": {
      "scene": "archive",
      "time": "20:04",
      "speaker": "档案员",
      "text": [
        "“对，就是这卷。知道编号就快多了。”她没有问我为什么记得，把公开查询页面打开，又给林夏看原签收单的扫描件。",
        "“这里还要核对一张停移通知。清场公示是建筑管理文件，影像原件另有交接程序，不能混在一起看。”"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "核对原始签收单",
          "to": "archive_sign",
          "flags": [
            "copy"
          ]
        },
        {
          "label": "先读林远川留下的备注",
          "to": "archive_margin"
        }
      ]
    },
    "archive_public_notice": {
      "scene": "archive",
      "time": "20:04",
      "speaker": "档案员",
      "text": [
        "“明天清的是展架、临时围挡和失去使用条件的设备。原件不归清运队处置。”她把两种公文并排放好。",
        "林夏说自己把“最后清场”看成“最后一次见到”。档案员没有嘲笑她：“通知写得不好，着急的人很容易看岔。我们把能确认的确认下来。”"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "查到对应原件的编号",
          "to": "archive_catalog"
        },
        {
          "label": "报出已经记住的编号",
          "to": "archive_sign",
          "requires": [
            "archive"
          ],
          "flags": [
            "copy"
          ]
        }
      ]
    },
    "archive_margin": {
      "scene": "archive",
      "time": "20:09",
      "speaker": "旁白",
      "text": [
        "备注栏有一段与展览无关的文字：“给小夏的信，先放工作袋。没寄不是因为她不该走，是我还没有学会怎么说再见。”",
        "林夏用指尖压住纸角：“我一直以为，他没再给我写东西。”档案员把一份经家属许可留存的信稿副本调出来，问她是否要看。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "由林夏自己决定是否阅读",
          "to": "archive_letter_offer",
          "flags": [
            "trust"
          ]
        },
        {
          "label": "先把手续查全，之后再看",
          "to": "archive_sign",
          "flags": [
            "copy"
          ]
        }
      ]
    },
    "archive_letter_offer": {
      "scene": "archive",
      "time": "20:11",
      "speaker": "林夏",
      "text": [
        "她点头：“我想看。你可以在旁边，不用给它做解释。”",
        "信稿没有落款，因为字写到最后，已经只是一个父亲在跟女儿说话。它和正式档案放在一起，竟显得比任何公章都私人。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "陪她读信稿",
          "to": "archive_letter",
          "flags": [
            "letter_read"
          ]
        }
      ]
    },
    "archive_letter": {
      "scene": "archive",
      "time": "20:14",
      "speaker": "林夏",
      "text": [
        "“你不欠这条街一个留下来的承诺。想走就走，想回就回。我说舍不得，是我自己的舍不得，不是让你负责。”",
        "“那天没拍完的照片，等你愿意，我们再拍。要是我慢得赶不上，也别为等我错过你的车。”她把这句读了两遍，第二遍终于没有低着头。"
      ],
      "mood": "worried",
      "choices": [
        {
          "label": "问她现在最想做的事",
          "to": "archive_letter_after"
        },
        {
          "label": "替她决定该接受录取",
          "to": "archive_correct"
        }
      ],
      "memory": [
        "letter"
      ]
    },
    "archive_letter_after": {
      "scene": "archive",
      "time": "20:17",
      "speaker": "林夏",
      "text": [
        "“取回胶片，然后去学怎么保存它。也保存别人的胶片。”她想了想，又笑，“我可能还会学得很慢，你别每天问我是不是后悔。”",
        "我说可以发照片给我，作业也可以，窗外的树也可以。她答应了。这次的“以后”，终于不再是结束话题的办法。"
      ],
      "mood": "smile",
      "choices": [
        {
          "label": "回到档案，查明交接手续",
          "to": "archive_sign",
          "flags": [
            "trust",
            "copy"
          ]
        }
      ]
    },
    "archive_correct": {
      "scene": "archive",
      "time": "20:17",
      "speaker": "林夏",
      "text": [
        "“也许我会走。但我想自己说出来。”她把副本放平，认真看着我，“你可以为我的决定高兴，不用替它盖章。”",
        "我点头，先把那句“我早就告诉过你”从心里擦掉。她等了几秒，才自己说起录取通知。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "这次认真听她说完",
          "to": "archive_letter_after",
          "flags": [
            "trust"
          ]
        },
        {
          "label": "先继续查手续",
          "to": "archive_sign",
          "flags": [
            "copy"
          ]
        }
      ]
    },
    "archive_sign": {
      "scene": "archive",
      "time": "20:20",
      "speaker": "我",
      "text": [
        "原签收单列着三只铁盒，保管位置是钟楼一层灯箱下方。文件右下角有清晰的停移编号：A-17／0717。",
        "档案员特别指出“停止移作他用，待原件交接”那一行：“这份不是拆除审批。它只能说明胶片怎么交，不会凭空让整片街恢复原样。今晚先把该保护的保护好。”"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "保存带编号的副本并联系登记人",
          "to": "archive_call",
          "flags": [
            "copy"
          ]
        },
        {
          "label": "把这份文件当作已经完成任务",
          "to": "paper_depart"
        },
        {
          "label": "查看值守处附的现场路线图",
          "to": "archive_map"
        }
      ],
      "memory": [
        "hold_order"
      ]
    },
    "archive_call": {
      "scene": "archive",
      "time": "20:23",
      "speaker": "陈工",
      "text": [
        "陈工接起电话，先核对文件编号，然后说会给值守员发正式交接确认。她提醒，今晚线路切换定在 21:17，暴雨可能影响照明。",
        "“取件可以，但不要靠近主楼梯。你们到了先找值守员，两个人走东侧检修通道。不要为了抢一分钟，去赌已经知道有问题的地方。”"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "查看东侧通道示意图",
          "to": "archive_map"
        },
        {
          "label": "确认照明切换和隔离帘的事",
          "to": "archive_power"
        }
      ],
      "memory": [
        "bell_time"
      ]
    },
    "archive_power": {
      "scene": "archive",
      "time": "20:25",
      "speaker": "档案员",
      "text": [
        "附页说明写得很具体：切换时，旧钟机先响，灯箱电路断开，隔离帘回到关闭位置。它不是针对谁的陷阱，也不会因为我相信朋友就停止运行。",
        "林夏把 21:17 设成提前五分钟提醒：“那就给自己留足时间。我们不是来跟钟比赛的。”"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "确认东侧通道在哪里",
          "to": "archive_map"
        }
      ],
      "memory": [
        "bell_time"
      ]
    },
    "archive_map": {
      "scene": "archive",
      "time": "20:27",
      "speaker": "旁白",
      "text": [
        "现场图上的东侧检修通道画着一条蓝线，避开积水主楼梯，终点是值守室。林夏把图放大，用手指确认了两个转角。",
        "图角有黄色提示：“隔离帘弹簧未更换，手动释放须双人操作。”我拍下整张图，连同提示一起保存，没有只截最好看的路线。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "读清双人操作的提示",
          "to": "archive_release"
        },
        {
          "label": "带着副本去找林夏一起碰面",
          "to": "rendezvous"
        }
      ],
      "memory": [
        "blue_route"
      ]
    },
    "archive_release": {
      "scene": "archive",
      "time": "20:29",
      "speaker": "我",
      "text": [
        "一人站在安全线外持续压住释放杆，另一人打开灯箱下的存放格。杆会自己弹回，不能拿包、木棍或相机把它卡住。",
        "我曾经觉得两个人同行只是让人安心。今晚它成了一条非常具体的条件：有人必须留下，也有人必须被信任着往前一步。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "和林夏确认分工，再出发",
          "to": "rendezvous",
          "flags": [
            "manual_known"
          ]
        },
        {
          "label": "觉得自己可以想办法，一个人去",
          "to": "solo_depart"
        }
      ],
      "memory": [
        "pair_release"
      ]
    },
    "paper_depart": {
      "scene": "archive",
      "time": "21:10",
      "speaker": "旁白",
      "text": [
        "我把副本发给各方，确认铁盒不列入清运，原件会在天气好转后正式交接。每个人都说，这样处理最合理。",
        "林夏也说谢谢。她把还没读完的信稿收进包里，我们站在档案室门口，很像两个刚完成同一项工作的同事。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "在交接确认里结束今晚",
          "to": "end_paper"
        },
        {
          "label": "还是想陪她把未说完的话说完",
          "to": "paper_return",
          "requires": [
            "companion"
          ]
        }
      ]
    },
    "paper_return": {
      "scene": "archive",
      "time": "21:11",
      "speaker": "我",
      "text": [
        "“手续办完，不代表你的告别也办完了。”我说，“如果还想去看一眼，我陪你到安全的位置。如果不想，也可以现在回家。”",
        "她看了看时间：“先联系值守员，别赶那条坏楼梯。能做多少算多少。今晚不用再替任何人证明勇敢。”"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "按蓝线赶去值守室",
          "to": "tower_east",
          "requires": [
            "blue_route"
          ],
          "flags": [
            "trust",
            "copy"
          ]
        },
        {
          "label": "留在门口，约好下一次同行",
          "to": "end_paper"
        }
      ]
    },
    "end_paper": {
      "scene": "archive",
      "time": "21:17",
      "speaker": "旁白",
      "text": [
        "陈工的确认消息抵达时，钟声也从远处传来。A-17 原件将被妥善移交，这条街至少留下了一份不会被误装进垃圾袋的记忆。",
        "可林夏望着雨，我忽然想再问一句“你现在想什么”。相机先我一步响了，那个没问出口的问题跟着时间回到原处。"
      ],
      "mood": "calm",
      "choices": [],
      "ending": "paper"
    },
    "tower_early": {
      "scene": "clocktower",
      "time": "20:03",
      "speaker": "旁白",
      "text": [
        "钟楼前的栏杆挂着“检修中”而不是“禁止一切通行”。值守员听完来意，让我们先在雨棚下等，自己去核对登记。",
        "林夏指着主楼梯边缘的积水：“以前从这里走很快。今天不行了。”她说的是楼梯，我却想起很多自己以为永远好用的办法。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "和林夏等核对，查看现场说明",
          "to": "tower_notice"
        },
        {
          "label": "询问哪条路能安全到达灯箱",
          "to": "tower_route"
        },
        {
          "label": "认为来不及，先找一条路进去",
          "to": "tower_shortcut"
        }
      ]
    },
    "tower_notice": {
      "scene": "clocktower",
      "time": "20:07",
      "speaker": "我",
      "text": [
        "告示里有两行关键文字：21:17 进行线路切换；影像原件等待家属与档案馆共同确认后移交。",
        "林夏拍下告示：“至少有一件事可以确定，不是过了今晚所有东西都会被扔掉。”她松了一口气，才承认自己一整天都没敢细看通知。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "核对影像原件的文件编号",
          "to": "tower_file"
        },
        {
          "label": "了解线路切换会影响什么",
          "to": "tower_power"
        }
      ],
      "memory": [
        "bell_time"
      ]
    },
    "tower_file": {
      "scene": "clocktower",
      "time": "20:11",
      "speaker": "值守员",
      "text": [
        "“A-17 的铁盒，我知道。你们最好拿到档案馆副本，我有正式确认，交接才说得清楚。”值守员把档案室电话写给林夏。",
        "他说这不是为难家属：“照片丢了，不能靠一句‘我当时以为’交代。你们做这一步，我也好把东西稳稳交出去。”"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "用手机查 A-17 公开目录",
          "to": "tower_lookup",
          "flags": [
            "copy"
          ]
        },
        {
          "label": "先问通道与灯箱情况",
          "to": "tower_route"
        }
      ],
      "memory": [
        "archive"
      ]
    },
    "tower_lookup": {
      "scene": "clocktower",
      "time": "20:15",
      "speaker": "我",
      "text": [
        "查询页的验证很简单：公开副本码 0717，与告示上的编号一致。我看见签收人、三只铁盒的编号，以及不列入建筑清运的说明。",
        "林夏把副本转给陈工，接着给值守员看完整页面。得到正式回复还要等一会儿，我们正好把取件流程问清楚。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "询问安全通道",
          "to": "tower_route"
        }
      ],
      "memory": [
        "hold_order"
      ]
    },
    "tower_power": {
      "scene": "clocktower",
      "time": "20:12",
      "speaker": "值守员",
      "text": [
        "“切换前蓝灯闪三次。旧钟机响完，灯会灭一小会儿，隔离帘自动落下。人站在安全线外就没事，别钻帘子。”",
        "他指向墙上的手动释放杆：“最怕有人觉得伸手够一下就行，结果进退两难。东西可以等，手别跟弹簧较劲。”"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "问手动释放怎样操作",
          "to": "tower_manual"
        },
        {
          "label": "先看看东侧通道",
          "to": "tower_route"
        }
      ],
      "memory": [
        "bell_time"
      ]
    },
    "tower_route": {
      "scene": "clocktower",
      "time": "20:50",
      "speaker": "旁白",
      "text": [
        "值守员带我们认了东侧蓝色检修标记。通道有棚，转角不长，主楼梯的积水从这里看过去比想象中深。",
        "我记住了线路，也记住他反复提醒的顺序：先确认交接，再确认通道，最后由两个人配合取盒。没有哪一步能被“我很着急”代替。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "到安全线外看释放杆",
          "to": "tower_manual"
        },
        {
          "label": "和林夏检查相机里的印样",
          "to": "tower_photo"
        }
      ],
      "memory": [
        "blue_route"
      ]
    },
    "tower_manual": {
      "scene": "clocktower",
      "time": "20:50",
      "speaker": "我",
      "text": [
        "我试着站在安全线外压杆，灯箱下面的隔离帘升起一点；手一松，它立刻回落。没有缓冲，也没有给人冲进去的时间。",
        "值守员示范了两人分工：“一个稳住，一个取。觉得累就说，立即换，别为了好看硬撑。”林夏站到我旁边，把操作步骤重新说了一遍。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "和她确认不会单独操作",
          "to": "tower_photo",
          "flags": [
            "manual_known"
          ]
        },
        {
          "label": "仍想找东西把释放杆卡住",
          "to": "unsafe_wedge"
        }
      ],
      "memory": [
        "pair_release"
      ]
    },
    "unsafe_wedge": {
      "scene": "clocktower",
      "time": "20:50",
      "speaker": "林夏",
      "text": [
        "我刚从包里找出一把伞，林夏就按住了我的手：“别。你不是一定要成为没有别人也能行的人。”",
        "值守员把伞收回去，带我们重新站到安全线外。没有发生惊险的奇迹，只有一个还来得及被收住的坏主意。"
      ],
      "mood": "determined",
      "choices": [
        {
          "label": "承认需要她配合",
          "to": "tower_photo",
          "flags": [
            "trust",
            "manual_known"
          ]
        },
        {
          "label": "不再取件，独自去主楼梯看看",
          "to": "solo_depart"
        }
      ]
    },
    "tower_photo": {
      "scene": "clocktower",
      "time": "20:50",
      "speaker": "林夏",
      "text": [
        "她从相机背带的夹层抽出一张印样。照片里的小林夏站在长椅左侧，右侧留了空，远处钟盘恰好指向 21:17。",
        "“这个时间是那天最后一班车要来的时间。”她翻到背面，念出父亲的字：“第 25 格留着，别替另一个人站好位置。”"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "问她那天真正想说什么",
          "to": "tower_confession"
        },
        {
          "label": "一起记下相机的双线接口",
          "to": "tower_cables",
          "flags": [
            "second_cable"
          ]
        }
      ],
      "memory": [
        "blank_frame"
      ]
    },
    "tower_confession": {
      "scene": "clocktower",
      "time": "20:50",
      "speaker": "林夏",
      "text": [
        "“我想说，我会回来看你，不是我永远不走。我没有说清，他也没有问清。后来我们都觉得，先开口的人像在认输。”",
        "她把印样翻回来：“可现在我不想再跟一张旧照片比赛了。我想把它带走，和新的照片放在一起。”"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "告诉她我也不想再替她选择",
          "to": "tower_cables",
          "flags": [
            "trust",
            "second_cable"
          ]
        }
      ],
      "memory": [
        "companion"
      ]
    },
    "tower_cables": {
      "scene": "clocktower",
      "time": "20:50",
      "speaker": "我",
      "text": [
        "值守室保存着摄影展的备用快门线。登记本写明相机和互动联动座都属于林远川，我签收后把线交给林夏。",
        "她把两根线平放在掌心：“以前他拍合照，总是自己跑来跑去。这次至少不用任何人赶最后一秒。”相机计数窗轻轻抖了一下，仍没跳到下一格。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "回到值守室，把线索合起来",
          "to": "rendezvous"
        }
      ]
    },
    "tower_shortcut": {
      "scene": "clocktower",
      "time": "20:50",
      "speaker": "旁白",
      "text": [
        "我沿主楼梯走了几步，鞋底立刻在水里滑了一下。栏杆上的胶带说明有一块踏板等待更换，我直到此刻才真正看清。",
        "林夏没有追上来。她站在下面说：“我需要有人陪我，不需要有人为了证明在乎，先把自己放到危险里。”"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "退回安全处，问清通道",
          "to": "tower_route",
          "flags": [
            "trust"
          ]
        },
        {
          "label": "还是坚持独自取盒",
          "to": "solo_depart"
        }
      ]
    },
    "remembered_archive": {
      "scene": "cafe",
      "time": "19:51",
      "speaker": "我",
      "text": [
        "我打开 A-17 的公开检索页，输入 0717。记忆里的文件编号与眼前扫描件一致，停移通知仍清楚写着三只铁盒的去向。",
        "林夏核对过姓名，亲自给陈工发了消息。不是因为我说“我早知道”，而是我们都能看见同一份证据。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "保存完整副本，提前走向钟楼",
          "to": "remembered_walk"
        }
      ]
    },
    "remembered_walk": {
      "scene": "rain-street",
      "time": "20:18",
      "speaker": "林夏",
      "text": [
        "我们还有余裕慢慢走。她说起要去的那座城市，先说冬天很冷，又说学校修复室窗外有一棵很大的树。",
        "我问她想不想先读父亲的信。她看见我记下的摘句，给许姨打电话，请对方确认并发送原信照片。等照片传来，她自己把它读完。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "认真听她读完信",
          "to": "remembered_letter"
        },
        {
          "label": "先讨论取件的技术安排",
          "to": "rendezvous"
        }
      ]
    },
    "remembered_letter": {
      "scene": "rain-street",
      "time": "20:25",
      "speaker": "林夏",
      "text": [
        "“想走就走，想回就回。”她读着照片上的字，眼睛被街灯照得很亮。",
        "“你看，他连字都写得像在等人。我以前只看到他舍不得，没看到他也在学着送我走。”她把原信照片存了两份，问我到钟楼后能不能一起拍一张新的。"
      ],
      "mood": "smile",
      "choices": [
        {
          "label": "说好，但由她决定何时按下快门",
          "to": "rendezvous",
          "flags": [
            "trust",
            "letter_read"
          ]
        }
      ],
      "memory": [
        "letter"
      ]
    },
    "mobile_copy": {
      "scene": "rain-street",
      "time": "20:34",
      "speaker": "我",
      "text": [
        "沿途信号不好，我和林夏在有遮雨棚的路口停下，把 A-17 的原签收单与停移通知完整下载。",
        "她亲自核对铁盒编号，再把页面发给陈工。对方回复：“已告知值守员。先走东侧蓝线，到后面一起确认。”有来路的线索终于变成可以执行的步骤。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "继续到钟楼碰面",
          "to": "rendezvous"
        }
      ]
    },
    "rendezvous": {
      "scene": "clocktower",
      "time": "20:50",
      "speaker": "旁白",
      "text": [
        "我们在值守室的檐下会合。雨从屋檐连成一串，林夏把工作袋放进干燥的纸箱，让自己空出两只手。",
        "21:17 还没到。我忽然发现，重来最容易给人的错觉，是以为只要知道终点，就不必再陪别人走到那里。她抬头问：“现在，我们一项一项确认？”"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "先问她，此刻还想不想继续",
          "to": "ask_again"
        },
        {
          "label": "核对铁盒交接依据",
          "to": "proof_check"
        },
        {
          "label": "要求她等着，自己进去",
          "to": "solo_depart"
        },
        {
          "label": "把准确的时间当作全部依据",
          "to": "alarm_arrive"
        }
      ]
    },
    "ask_again": {
      "scene": "clocktower",
      "time": "20:50",
      "speaker": "林夏",
      "text": [
        "“想继续。也有点怕。”她回答得很快，又把后半句补上，“我怕不是因为我不想走，是因为这件事对我很重要。”",
        "我告诉她，如果中途决定停下，我们就一起停。她点头，按住被风吹起的衣角：“那我们试试。我来拿铁盒，你在外面看着我，好吗？”"
      ],
      "mood": "determined",
      "choices": [
        {
          "label": "接受分工，一起核对文件",
          "to": "proof_check",
          "flags": [
            "trust"
          ]
        },
        {
          "label": "记得她需要的是同伴，明确答应",
          "to": "trust_recall",
          "requires": [
            "companion"
          ]
        },
        {
          "label": "先讲她三年前爱喝什么，缓和气氛",
          "to": "bad_smalltalk"
        }
      ],
      "memory": [
        "companion"
      ]
    },
    "trust_recall": {
      "scene": "clocktower",
      "time": "20:50",
      "speaker": "我",
      "text": [
        "我说起那杯温水，也说起消息里那个被她换掉的“帮”字：“我今晚来，是和现在的你一起做这件事。”",
        "她把一根快门线放到我手里：“那你也可以怕，可以说累，可以让我帮忙。这才是两个人。”风把雨吹进檐下，我们同时往里挪了一步。"
      ],
      "mood": "smile",
      "choices": [
        {
          "label": "一起核对交接依据",
          "to": "proof_check",
          "flags": [
            "trust"
          ]
        }
      ]
    },
    "bad_smalltalk": {
      "scene": "clocktower",
      "time": "20:50",
      "speaker": "林夏",
      "text": [
        "“你还记得奶茶，却差点忘了我今天说过的温水。”她说完，自己先笑了，“没关系，重新记一遍。”",
        "我也笑了。这不是一道答错就永远失去机会的题，她仍然愿意说，我也仍然可以听。"
      ],
      "mood": "smile",
      "choices": [
        {
          "label": "记下现在的她，再问一句是否准备好了",
          "to": "proof_check",
          "flags": [
            "trust"
          ]
        },
        {
          "label": "承认她的口味已经变了",
          "to": "proof_check",
          "requires": [
            "taste"
          ],
          "flags": [
            "trust"
          ]
        }
      ],
      "memory": [
        "taste"
      ]
    },
    "proof_check": {
      "scene": "clocktower",
      "time": "20:50",
      "speaker": "值守员",
      "text": [
        "值守员把登记簿摊在我们面前：“铁盒还在，想取不是问题。交接要对上 A-17 的编号，还要知道今晚从哪里走。”",
        "林夏看向我，眼神没有催促。我们还来得及核对，来得及补一条消息，也来得及承认有些事暂时不清楚。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "出示刚才保存的完整副本",
          "to": "proof_ready",
          "requiresFlags": [
            "copy"
          ],
          "flags": [
            "copy"
          ]
        },
        {
          "label": "按已记住的停移编号补查文件",
          "to": "proof_recall",
          "requires": [
            "archive",
            "hold_order"
          ],
          "flags": [
            "copy"
          ]
        },
        {
          "label": "请值守员帮我们从目录查起",
          "to": "proof_slow"
        },
        {
          "label": "认为没有时间了，直接进楼",
          "to": "solo_depart"
        }
      ]
    },
    "proof_ready": {
      "scene": "clocktower",
      "time": "20:50",
      "speaker": "旁白",
      "text": [
        "值守员逐项核对副本，陈工的确认也恰好发来。三只铁盒的编号、家属身份、移交目的地，都被写进同一页交接记录。",
        "林夏认真签了名：“取出来以后送修复室，不先拿回家乱拆。”我看着她的字，才觉得这不是追回过去，而是在给过去安排一个可以继续存在的地方。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "确认安全通道",
          "to": "route_check"
        }
      ]
    },
    "proof_recall": {
      "scene": "clocktower",
      "time": "20:50",
      "speaker": "我",
      "text": [
        "我用 A-17 和 0717 重新打开公开副本，林夏核对父亲姓名与铁盒编号。哪怕这些字我已经在别的晚上看过，眼前这一晚也值得一个完整的确认。",
        "陈工在电话里说“信息一致，可以由值守员见证”。我们把电子副本存好，交接终于有了清楚的来路。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "确认东侧通道",
          "to": "route_check"
        }
      ]
    },
    "proof_slow": {
      "scene": "clocktower",
      "time": "20:50",
      "speaker": "旁白",
      "text": [
        "值守员帮我们查到原件目录。通知没有说错，铁盒不会被混进建筑垃圾，但正式确认今晚无法立刻补齐。",
        "他提议明早由档案馆统一取件，林夏同意了。我们仍然可以把这件事做好，只是今夜的愿望不一定能在今夜全部完成。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "接受这次交接的边界",
          "to": "end_paper"
        },
        {
          "label": "准确说出编号，补齐最后一项",
          "to": "proof_recall",
          "requires": [
            "hold_order",
            "archive"
          ],
          "flags": [
            "copy"
          ]
        }
      ],
      "memory": [
        "archive",
        "hold_order"
      ]
    },
    "route_check": {
      "scene": "clocktower",
      "time": "20:50",
      "speaker": "旁白",
      "text": [
        "主楼梯边的水已经漫过第二级台阶，原本看起来更近的路，反而需要离开。东侧检修门亮着蓝色标记。",
        "值守员带头确认照明，林夏问我路线是否看清。我没有说“差不多”，而是把自己知道和不知道的都告诉她。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "指出蓝线的两个转角，同行入内",
          "to": "tower_east",
          "requires": [
            "blue_route"
          ]
        },
        {
          "label": "请值守员现场带我们认路",
          "to": "route_learn"
        },
        {
          "label": "仍想从主楼梯抄近路",
          "to": "tower_shortcut"
        }
      ]
    },
    "route_learn": {
      "scene": "clocktower",
      "time": "20:57",
      "speaker": "值守员",
      "text": [
        "他把蓝色标记逐个指给我们看：“这个通道通值守室，不通施工层。拿盒时也别越过黄黑线。”",
        "林夏拍了入口和转角两张照片。我想起小时候她总嫌父亲拍得慢，现在她先确认照片清楚，才把手机收起来。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "按蓝线进入",
          "to": "tower_east"
        }
      ],
      "memory": [
        "blue_route"
      ]
    },
    "tower_east": {
      "scene": "clocktower",
      "time": "21:11",
      "speaker": "旁白",
      "text": [
        "检修通道比想象中安静。雨落在铁棚上，像有人把一卷胶片慢慢放开。我们经过积水楼梯的另一侧，看到栏杆上的警示牌正好被风吹得朝向这里。",
        "值守员确认安全区后，去门外等待接应。灯箱下三只铁盒都在，隔离帘的释放杆立在手边，钟声还没有响。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "确认隔离帘的双人操作",
          "to": "mechanism_check"
        },
        {
          "label": "先让林夏看看父亲的字",
          "to": "letter_check"
        },
        {
          "label": "自己压杆，再想办法伸手拿盒",
          "to": "solo_try"
        }
      ]
    },
    "mechanism_check": {
      "scene": "clocktower",
      "time": "21:12",
      "speaker": "我",
      "text": [
        "黄色说明写着：一人持续压杆，一人取盒，不能卡住释放杆。灯箱边缘到安全线的距离，恰好让独自操作的人差一只手。",
        "林夏走到另一侧，问我愿意在哪个位置。她没有等我证明自己能做完所有事，只等我把其中一件交给她。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "按读过的说明，确认双人分工",
          "to": "team_plan",
          "requires": [
            "pair_release"
          ]
        },
        {
          "label": "逐句读说明，再共同演练",
          "to": "manual_learn"
        },
        {
          "label": "试着自己完成全部动作",
          "to": "solo_try"
        }
      ]
    },
    "manual_learn": {
      "scene": "clocktower",
      "time": "21:12",
      "speaker": "旁白",
      "text": [
        "我和林夏照着说明做了一次空手演练。她报“准备”，我才压杆；她说“退出”，我先确认她回到线外，再慢慢松手。",
        "练习很笨，也很平静。没有人催我们一遍成功，倒是那台我一直带着的相机，安安静静等在干燥的台面上。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "记清操作，正式分工",
          "to": "team_plan",
          "flags": [
            "manual_known"
          ]
        }
      ],
      "memory": [
        "pair_release"
      ]
    },
    "team_plan": {
      "scene": "clocktower",
      "time": "21:12",
      "speaker": "林夏",
      "text": [
        "“我取盒，你压杆。灯灭也不往前跑。如果我说停，你就先等我退出来；你累了也马上说。”",
        "我把每一句复述一遍。她像是松了一口气：“很好。不用说一定不会有事，我们知道有事的时候怎么一起做。”"
      ],
      "mood": "determined",
      "choices": [
        {
          "label": "和她确认准备就绪",
          "to": "letter_check",
          "flags": [
            "team",
            "manual_known"
          ]
        },
        {
          "label": "还是觉得自己一个人更快",
          "to": "solo_try"
        }
      ]
    },
    "letter_check": {
      "scene": "clocktower",
      "time": "21:12",
      "speaker": "林夏",
      "text": [
        "铁盒盖上贴着林远川的字：“不要急着打开，先送去干燥的地方。”她隔着灯箱玻璃，看了很久。",
        "“如果有那封信，我想先听完它。”她说，“没有也没关系，但我不想今晚所有决定都建立在我以为他会怪我这件事上。”"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "陪她回想并核对原信的意思",
          "to": "letter_recall",
          "requires": [
            "letter"
          ]
        },
        {
          "label": "已经一起读完，问她现在想怎么做",
          "to": "before_bell",
          "requiresFlags": [
            "letter_read"
          ]
        },
        {
          "label": "先取胶片，其他以后再说",
          "to": "before_bell"
        },
        {
          "label": "还没分好工，先确认双人操作",
          "to": "mechanism_check"
        }
      ]
    },
    "letter_recall": {
      "scene": "clocktower",
      "time": "21:12",
      "speaker": "我",
      "text": [
        "我没有把记住的话伪装成父亲此刻的命令，只问她愿不愿意听我读那张原信照片。她说愿意，便和我一起看向屏幕。",
        "“想走就走，想回就回。”她读到这里，自己补上后半句：“那天没拍完的照片，等你愿意，我们再拍。”父亲的声音不在这里，她自己的声音在。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "把选择还给她，一起准备取盒",
          "to": "before_bell",
          "flags": [
            "letter_read",
            "trust"
          ]
        }
      ]
    },
    "before_bell": {
      "scene": "clocktower",
      "time": "21:13",
      "speaker": "旁白",
      "text": [
        "蓝灯第一次闪动，提醒线路切换即将开始。我终于知道，21:17 不是某种非要夺走谁的恶意，它是一组会重复发生、也可以被认真准备的条件。",
        "林夏看着我：“我们照刚才说的做。来不及就停，拿到就一起退。”我应了一声。雨声很大，我还是听清了她。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "提前打开便携照明，按约定配合",
          "to": "take_ready",
          "requires": [
            "bell_time"
          ],
          "requiresFlags": [
            "team"
          ]
        },
        {
          "label": "先确认灯灭时的顺序，再配合",
          "to": "bell_rehearsal",
          "requiresFlags": [
            "team"
          ]
        },
        {
          "label": "尚未分工，立即补上确认",
          "to": "last_team"
        },
        {
          "label": "在钟响前独自伸手抢出铁盒",
          "to": "solo_try"
        }
      ]
    },
    "bell_rehearsal": {
      "scene": "clocktower",
      "time": "21:14",
      "speaker": "林夏",
      "text": [
        "我们把灯摆在台面边缘，不拿在需要压杆的手里。林夏再问了一遍：“你能看见我的脚退回黄线吗？”",
        "我说能。蓝灯闪第二次时，我没有盯着钟盘，而是看着她指给我的位置。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "按计划开始",
          "to": "take_ready",
          "flags": [
            "team"
          ]
        }
      ],
      "memory": [
        "bell_time"
      ]
    },
    "last_team": {
      "scene": "clocktower",
      "time": "21:14",
      "speaker": "我",
      "text": [
        "我承认自己还没有把分工说清。林夏没有责怪，只把我的手放在释放杆上，自己站到取盒的位置。",
        "“你看住我退回来的方向，不用替我走。”她说。我们照说明空试一遍，确认彼此的声音都能盖过雨声。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "按约定开始取盒",
          "to": "take_ready",
          "flags": [
            "team",
            "manual_known"
          ]
        },
        {
          "label": "还是收手，等明天正式移交",
          "to": "end_paper"
        }
      ],
      "memory": [
        "pair_release",
        "bell_time"
      ]
    },
    "take_ready": {
      "scene": "clocktower",
      "time": "21:15",
      "speaker": "旁白",
      "text": [
        "我压住释放杆，隔离帘缓缓升起。林夏蹲下去，一只一只取出铁盒，先放到干燥的平台，再示意我不要松手。",
        "第三只比预想重。她停住，抬头看我。我说我还能稳住，她才调整姿势，两手一起把它抱出来。每一步都没有赶上一次没有发生的灾难。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "等她退回安全线，再一起交接",
          "to": "take_success",
          "requiresFlags": [
            "team"
          ]
        },
        {
          "label": "怕她来不及，松杆去拉她",
          "to": "solo_interrupt"
        }
      ]
    },
    "solo_interrupt": {
      "scene": "clocktower",
      "time": "21:16",
      "speaker": "旁白",
      "text": [
        "我刚准备松手，林夏就喊：“先别动，我正在退！”这句话把我拦住了。",
        "我重新压稳，等她抱着铁盒回到黄线外，才慢慢松开。她喘了口气：“你可以担心，但先看见我正在做什么，好吗？”"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "承认自己差点打乱分工",
          "to": "take_success",
          "flags": [
            "trust"
          ]
        }
      ]
    },
    "take_success": {
      "scene": "clocktower",
      "time": "21:17",
      "speaker": "旁白",
      "text": [
        "钟声响起，灯灭了两秒。隔离帘落下时，我们都站在安全线外，三只铁盒整整齐齐留在干燥的平台。",
        "值守员拿来交接袋，陈工在电话那头逐一确认编号。林夏抱着父亲留下的胶片，先笑出来，随后眼泪才慢慢落下。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "只谈手续，让她赶紧收好东西",
          "to": "film_silence"
        },
        {
          "label": "问她还想在这里停一会儿吗",
          "to": "after_rescue",
          "requiresFlags": [
            "trust"
          ]
        },
        {
          "label": "记得她要的是陪伴，重新问她",
          "to": "after_rescue",
          "requires": [
            "companion"
          ],
          "flags": [
            "trust"
          ]
        }
      ]
    },
    "film_silence": {
      "scene": "clocktower",
      "time": "21:17",
      "speaker": "我",
      "text": [
        "我一口气说完防潮、移交、学校和将来的打算。林夏抱着铁盒，没有打断。等我终于停下来，她只说：“这些我都会考虑。”",
        "相机的计数窗还卡在那里。我曾经以为，只要重要的东西没有丢，今晚就自然会得到一个圆满的句号。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "把已经完成的事当作全部答案",
          "to": "end_film"
        },
        {
          "label": "停下来，问她真正的心情",
          "to": "after_rescue",
          "requires": [
            "invitation",
            "companion"
          ],
          "flags": [
            "trust"
          ]
        }
      ]
    },
    "end_film": {
      "scene": "clocktower",
      "time": "21:17",
      "speaker": "旁白",
      "text": [
        "林夏说谢谢我帮她取回东西。那声谢谢是真心的，距离也是真实的。我替她把明天想得很远，却没有问她今晚想说什么。",
        "相机发出轻响。铁盒没有从她手里消失，先消失的是钟声；世界像被重新绕紧的胶卷，转回 19:07。"
      ],
      "mood": "calm",
      "choices": [],
      "ending": "film"
    },
    "after_rescue": {
      "scene": "clocktower",
      "time": "21:17",
      "speaker": "林夏",
      "text": [
        "“我想停一会儿。不是为了把这里永远记住，是因为我现在站在这里，很高兴。”",
        "她擦了擦眼角：“我会去学校。我会回来，也可能有一阵不回来。你可以想我，别替我写一份必须回来的期限。”我说好，想念可以是一封信，不必是一张催还单。"
      ],
      "mood": "smile",
      "choices": [
        {
          "label": "把父亲没寄出的信读完",
          "to": "letter_final",
          "requires": [
            "letter"
          ]
        },
        {
          "label": "我们已经读过，让她自己说下一步",
          "to": "photo_offer",
          "requiresFlags": [
            "letter_read"
          ]
        },
        {
          "label": "用“以后再说”结束谈话",
          "to": "end_film"
        }
      ]
    },
    "letter_final": {
      "scene": "clocktower",
      "time": "21:17",
      "speaker": "林夏",
      "text": [
        "她借着手机屏幕，把那封信重新读了一遍。读到“等你愿意，我们再拍”时，她把相机从袋里拿出来，没有再急着收好。",
        "“我以前以为，爸爸是在原地等我回来。现在我觉得，他也希望看看我走到哪里。”她把信放回防水袋，这次像是在收一件珍贵的东西，不是一份判决。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "问她愿不愿意拍一张现在的照片",
          "to": "photo_offer",
          "flags": [
            "letter_read",
            "trust"
          ]
        }
      ]
    },
    "photo_offer": {
      "scene": "clocktower",
      "time": "21:17",
      "speaker": "我",
      "text": [
        "我问她要不要拍照，先说如果不愿意也可以。林夏接过相机，镜头里倒映着两个人被雨打湿的衣角。",
        "她看了看计数窗，又看我：“第 25 格一直空着。也许它等的不是那天照原样重来，是我们不用再按原来的方式站着。”"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "研究那张留白印样与双快门线",
          "to": "exposure_learn",
          "requires": [
            "blank_frame"
          ]
        },
        {
          "label": "像以前一样，我替她拍一张",
          "to": "single_photo"
        },
        {
          "label": "已经明白共同曝光，请她选择",
          "to": "joint_offer",
          "requires": [
            "shared_exposure",
            "blank_frame"
          ],
          "requiresFlags": [
            "letter_read",
            "trust"
          ]
        },
        {
          "label": "先询问计数窗为何停住",
          "to": "frame_learn"
        }
      ]
    },
    "frame_learn": {
      "scene": "clocktower",
      "time": "21:17",
      "speaker": "林夏",
      "text": [
        "她翻到相机袋里的手册，找到父亲写的备注。计数窗并不是“还剩多少次机会”，只是最后一格一直没有完成过片。",
        "“别替另一个人站好位置。”她慢慢念完，把那张旧印样翻到背面。两个人之间的空位，原来不是非要谁赶快填上去。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "看看两根快门线",
          "to": "exposure_learn"
        }
      ],
      "memory": [
        "blank_frame"
      ]
    },
    "single_photo": {
      "scene": "clocktower",
      "time": "21:17",
      "speaker": "旁白",
      "text": [
        "我让林夏站到灯下，自己退到镜头后。她站好了，却没有笑。",
        "“你又不在画面里。”她轻声说。快门空响，钟声像一根线被拉回原处。在雨滴停下以前，她把另一根快门线伸向我。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "看清她递来的那根线",
          "to": "end_promise"
        }
      ]
    },
    "exposure_learn": {
      "scene": "clocktower",
      "time": "21:17",
      "speaker": "林夏",
      "text": [
        "手册画着双线联动座，一根预压，一根释放。父亲做它，是让画面里的人也能决定按下的时刻。",
        "“不是你先把一切安排好，再叫我站进去。”林夏把两根线分开，“下一次，你问我愿不愿意，然后我们一起。”旧钟又响了一声，像刚刚找到路的回声。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "把这一次理解认真记住，留到下一次重来",
          "to": "end_promise"
        }
      ],
      "memory": [
        "shared_exposure"
      ]
    },
    "end_promise": {
      "scene": "clocktower",
      "time": "21:17",
      "speaker": "旁白",
      "text": [
        "我握住她递来的线，来不及按下，世界便轻轻亮了一下。我没有再抓紧相机，试图强迫它给我一个明天。",
        "这一次我记住的不是哪一秒会出事，而是她说“我们一起”时的样子。手机重新亮起：19:07。那句邀约终于有了不同的重量。"
      ],
      "mood": "calm",
      "choices": [],
      "ending": "promise",
      "memory": [
        "shared_exposure"
      ]
    },
    "joint_offer": {
      "scene": "clocktower",
      "time": "21:17",
      "speaker": "我",
      "text": [
        "我没有举起相机先替她选位置，而是把两根快门线放在台面上：“我想和你拍一张现在的照片。你愿意吗？”",
        "林夏看了我一会儿，笑着点头：“愿意。不是补以前欠的那张，是今晚我们自己想拍的这张。”她选了窗边，那里能看见雨，也能看见远处的路。"
      ],
      "mood": "smile",
      "choices": [
        {
          "label": "确认相机与备用线都在",
          "to": "joint_setup",
          "requiresFlags": [
            "second_cable"
          ]
        },
        {
          "label": "向值守员签领展览备用线，再一起准备",
          "to": "joint_get_cable"
        }
      ]
    },
    "joint_get_cable": {
      "scene": "clocktower",
      "time": "21:17",
      "speaker": "旁白",
      "text": [
        "值守员打开保存互动器材的抽屉，登记后把另一根快门线交给林夏。原来缺少的东西可以开口问，不必每一次都靠猜。",
        "我们把联动座放平，确认两根线各自归谁。林夏说如果有一根没接好就重接，不用把这一刻赶成最后一次机会。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "和她一起准备合照",
          "to": "joint_setup",
          "flags": [
            "second_cable"
          ]
        }
      ]
    },
    "joint_setup": {
      "scene": "clocktower",
      "time": "21:17",
      "speaker": "旁白",
      "text": [
        "相机稳稳放在干燥的台面，倒计时没有响。林夏站在我身边，肩膀碰到我的袖口，又自然地靠近一点。",
        "我想起 19:07 的“陪”，她现在喝的温水，C17 的工作袋，A-17 的文件，还有那条需要两个人走过的蓝线。记忆终于没有把今晚变成一场单人的考试。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "等她说准备好了，再共同按下",
          "to": "joint_wait"
        },
        {
          "label": "确认两根线都由我们自己握着",
          "to": "joint_wait"
        }
      ]
    },
    "joint_wait": {
      "scene": "clocktower",
      "time": "21:17",
      "speaker": "林夏",
      "text": [
        "她先按住预压线，问我：“准备好了吗？”",
        "我说准备好了，也问了她一遍。她点头：“这次明天要是真的来了，你先睡个好觉。还有，别把每次再见都说得像再也不见。”我笑着答应，手指终于没有因为害怕而用力到发白。"
      ],
      "mood": "smile",
      "choices": [
        {
          "label": "相信她的回答，共同释放快门",
          "to": "exposure",
          "requires": [
            "invitation",
            "taste",
            "companion",
            "locker",
            "archive",
            "blue_route",
            "pair_release",
            "letter",
            "hold_order",
            "blank_frame",
            "shared_exposure",
            "bell_time"
          ],
          "requiresFlags": [
            "trust",
            "letter_read",
            "copy",
            "team",
            "second_cable"
          ]
        },
        {
          "label": "还有线索没有核对，先把今晚的理解记住",
          "to": "end_promise",
          "note": "真结局需要把人物、路线、交接和相机线索都确认过；记忆会保留。"
        }
      ]
    },
    "exposure": {
      "scene": "clocktower",
      "time": "21:18",
      "speaker": "旁白",
      "text": [
        "咔嚓。不是之前那种空响，是一次完整、清晰的快门声。计数窗越过 25，过片杆终于轻轻走到底。",
        "钟楼的指针向前挪了一格。雨没有停，街灯也没有全部亮起，可手机屏幕跳成了 21:18。林夏伸手碰了碰那串数字，像在确认一扇终于能推开的门。"
      ],
      "mood": "smile",
      "choices": [
        {
          "label": "陪她完成交接，走到真正的明天",
          "to": "night_after"
        }
      ]
    },
    "night_after": {
      "scene": "rain-street",
      "time": "22:06",
      "speaker": "旁白",
      "text": [
        "铁盒由值守员暂存进防潮箱，林夏拿到签收回执；天亮后，陈工会陪她送往修复室。没有谁当场打开胶片，也没有谁必须在雨里完成所有告别。",
        "我们回到晚风咖啡外，店已经打烊。她把录取确认发出去，系统回复了一封普通得不能再普通的邮件。那封邮件属于明天。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "陪她等天亮后的第一班车",
          "to": "dawn_platform"
        }
      ]
    },
    "dawn_platform": {
      "scene": "dawn",
      "time": "06:12",
      "speaker": "林夏",
      "text": [
        "清晨的旧站广场不再发车，我们便沿新修的人行道走到真正的车站。云层开了一道小缝，光落在她的墨绿外套上。",
        "“以后我们还会误会，还会说错话。”她说，“但不用先等三年。”我说好。车来了，她把一根快门线留给我，另一根自己收好。"
      ],
      "mood": "smile",
      "choices": [
        {
          "label": "说“路上拍给我看”，目送她出发",
          "to": "end_dawn"
        }
      ]
    },
    "end_dawn": {
      "scene": "dawn",
      "time": "06:18",
      "speaker": "旁白",
      "text": [
        "林夏上车前回过头：“下次再见，不用赶在什么结束以前。”",
        "后来，第 25 张照片洗出来了。没有整座老街，也没有我们想象中过去应该有的样子，只有两个终于站在同一幅画面里的人。照片背面是她写的日期，和一句很普通的话：今晚谢谢你陪我。"
      ],
      "mood": "calm",
      "choices": [],
      "ending": "dawn"
    },
    "solo_depart": {
      "scene": "rain-street",
      "time": "20:50",
      "speaker": "我",
      "text": [
        "我把“我很快回来”发给林夏，带着相机走进雨里。发出去以后才发现，自己又没有等她回答。",
        "钟楼就在前面。越接近它，我越觉得只要拿到铁盒，一切迟来的解释都可以有个漂亮的开头。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "独自抵达钟楼",
          "to": "solo_arrive"
        },
        {
          "label": "停下来，告诉她我需要同伴",
          "to": "solo_turnback"
        }
      ]
    },
    "solo_turnback": {
      "scene": "rain-street",
      "time": "20:50",
      "speaker": "林夏",
      "text": [
        "她接通电话，先听我说完。没有挖苦，也没有立刻替我解围：“我在值守室这边。你过来，我们再一起决定。”",
        "我终于知道，承认刚才做错了，不会让整个晚上失效。路可以走回来，话也可以重新说。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "去值守室找她",
          "to": "rendezvous",
          "flags": [
            "trust"
          ]
        }
      ]
    },
    "solo_arrive": {
      "scene": "clocktower",
      "time": "21:05",
      "speaker": "旁白",
      "text": [
        "值守员核对身份后，让我站在安全线外看清操作说明。隔离帘抬起来时，我离铁盒仍然差一只手。",
        "手机里有林夏的消息：“我已经到了。你别抢着进去。”我看了看门口，那里有一个我本可以等的人。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "松开释放杆，等她一起确认",
          "to": "last_team",
          "flags": [
            "trust"
          ]
        },
        {
          "label": "觉得自己伸手就能拿到",
          "to": "solo_try"
        }
      ]
    },
    "solo_try": {
      "scene": "clocktower",
      "time": "21:16",
      "speaker": "旁白",
      "text": [
        "我压杆的手开始发酸，另一只手无论怎样伸，都够不到最里面的铁盒。雨声让那点距离显得格外固执。",
        "隔离帘动了一下。我还没来得及再试，值守员已经让我退回安全线。林夏站在门口，没有冲过来证明谁更在乎谁，只问我有没有受伤。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "承认一个人无法完成这套操作",
          "to": "end_solo"
        }
      ],
      "memory": [
        "pair_release",
        "bell_time"
      ]
    },
    "end_solo": {
      "scene": "clocktower",
      "time": "21:17",
      "speaker": "林夏",
      "text": [
        "“我想一起把东西拿出来，不是等你替我完成以后再感谢你。”",
        "钟声结束时，她把纸巾递给我。我的手没事，铁盒也暂时安全，可那张想象中的合照里仍然只有我安排好的位置。相机的轻响把这一刻重新收回夜色。"
      ],
      "mood": "worried",
      "choices": [],
      "ending": "solo"
    },
    "alarm_arrive": {
      "scene": "clocktower",
      "time": "20:50",
      "speaker": "旁白",
      "text": [
        "值守员确实增加了巡查，钟楼周围也更早围起警戒线。我准确说出了 21:17，却仍回答不了蓝灯、隔离帘和铁盒手续之间是什么关系。",
        "林夏站在我身旁，轻声说：“我相信你是担心。但我们需要一起弄明白，你不用一个人背着一个别人看不见的结局。”"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "拿出查过的正式文件，说明具体缘由",
          "to": "proof_ready",
          "requiresFlags": [
            "copy"
          ],
          "flags": [
            "copy"
          ]
        },
        {
          "label": "请求按现场流程重新确认",
          "to": "alarm_learn"
        },
        {
          "label": "仍坚持只要相信我的时间就够了",
          "to": "end_alarm"
        }
      ],
      "memory": [
        "bell_time"
      ]
    },
    "alarm_learn": {
      "scene": "clocktower",
      "time": "21:12",
      "speaker": "值守员",
      "text": [
        "值守员把照明切换、主楼梯积水和双人操作依次解释清楚。每说一条，都让我们复述一遍，确认没有把它们混在一起。",
        "我们没有赶在钟响前强行取件，决定等正式手续和天气都合适时再来。林夏把这些记进手机，这次不再只有我一个人知道。"
      ],
      "mood": "calm",
      "choices": [
        {
          "label": "接受今晚尚未完成的部分",
          "to": "end_alarm"
        }
      ],
      "memory": [
        "blue_route",
        "pair_release",
        "bell_time"
      ]
    },
    "end_alarm": {
      "scene": "clocktower",
      "time": "21:17",
      "speaker": "旁白",
      "text": [
        "21:17，钟楼依然停电，所有人都在安全区域。我的预言没有错，却也没有自动带来信任和理解。",
        "林夏问下次能不能一起从头查。我说能。相机像替我记下这个回答，接着雨声一轻，手机上又出现了那条 19:07 的邀约。"
      ],
      "mood": "calm",
      "choices": [],
      "ending": "alarm"
    }
  }
};
