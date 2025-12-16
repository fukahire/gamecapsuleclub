記錄一下這次悲慘的經過
前一個前端離職後，我把gitlab前前端的權限解掉，結果pipeline直接爆了，完全接不上
現在看應該是金鑰沒對上的問題

pipeline報錯如下
$ ssh -i $SSH_PRIVATE_KEY -o IdentitiesOnly=yes -o StrictHostKeyChecking=no \ $SSH_USER@$SSH_HOST "echo 'SSH 已連線成功 '"
Permission denied, please try again.
 user@1xx.xxx.x.xxx: Permission denied (publickey,password).

## 1. 這個時候應該先找到前前端的虛擬機
新進員工絕對要問舊員工，盡可以拿到可以拿到的資料。舊員工什麼都給不出來就GG
雖然有Shell、Bash等環境差異，但 Git CMD 就可以完成全部流程的樣子

ssh 帳號 / 密碼
ssh user@1xx.xxx.x.xxx / password

竟然還會有時登得上有時登不上

## 2.成功登入的自連測試
ssh -i gitlab_ci_key user@localhost
如果需要輸入密碼就是gitlab私鑰跟公鑰沒對起來
pipeline也是因為公私鑰沒對，ssh就會額外再向gitlab要密碼，得不到導致 Permission denied

## 3.產生鑰匙
指令：
ssh-keygen -t ed25519 -C "gitlab-ci" -f gitlab_ci_key
．會顯示key fingerprint & key's randomart image(但我不知道這是幹嘛用的)
ssh-keygen -y -f gitlab_ci_key (公鑰)
．會出現 ssh-ed25519 ... gitlab-ci 的公鑰
nano ~/.ssh/authorized_keys 會顯示虛擬機持有的key，gitlab的pipeline在跑的時候會用私鑰跟這裡的公鑰作比對
．把失效的key刪掉，貼上前面的公鑰，然後Ctrl+O覆寫->確認下面顯示的覆寫位址按Enter->Ctrl+X離開
cat gitlab_ci_key (產生私鑰)
．這裡要貼到gitlab的SSH_PRIVATE_KEY(gitlab>cicd>variables)。比較麻煩的是複製的時候從BEGIN到END都要複製得整整齊齊
-----BEGIN OPENSSH PRIVATE KEY-----
五行字
-----END OPENSSH PRIVATE KEY-----

．做完之後回去前面的自連測試，有需要輸入密碼就是不成功
成功的話就會不用透過密碼自動登入，這時再回去跑pipeline 高機率成功
