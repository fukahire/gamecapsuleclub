記錄一下這次的悲慘遭遇
前一個前端離職後，我把gitlab前前端的權限解掉，結果pipeline直接爆了，完全接不上
現在看應該是金鑰沒對上的問題

pipeline報錯如下
$ ssh -i $SSH_PRIVATE_KEY -o IdentitiesOnly=yes -o StrictHostKeyChecking=no \ $SSH_USER@$SSH_HOST "echo 'SSH 已連線成功 '"
Permission denied, please try again.
 user@1xx.xxx.x.xxx: Permission denied (publickey,password).

## 1. 這個時候應該先找到前前端的虛擬機
新進員工絕對要問舊員工，盡可能拿到可以拿到的資料。舊員工什麼都給不出來就GG
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

．做完之後回去前面的自連測試，有需要輸入密碼就是沒成功
成功的話就會不用透過密碼自動登入，這時再回去跑pipeline 高機率成功

其他有用到但我不是很懂的東西
cat ~/.ssh/authorized_keys
．顯示ssh公鑰內容

chmod 700 ~/.ssh
chmod：Linux/Unix 系統中用來修改檔案和目錄權限的命令
7：擁有者可讀/寫/進目錄 0：群組不行 0：其他人不行。只有帳號本人可進ssh
如.ssh別人看得到，ssh會直接禁止所有人的登入

chmod 600 ~/.ssh
6：擁有者可讀/寫 0：群組不行 0：其他人不行。只有帳號本人可進ssh
限制只有自己可以看、可以改

ls -ld ~/.ssh
列出.ssh 目錄本身的權限
drwx------ jane jane /home/user/.ssh
部分	意義
d：目錄/rwx------	擁有者可讀寫進、其他人不能；user 擁有者/群組；/home/jane/.ssh	路徑

ls -l ~/.ssh/authorized_keys
確認 authorized_keys 檔案權限
-rw-------
-	一般檔案；rw-------	只有你能讀寫；jane jane	擁有者 / 群組


SSH key 登入 同時檢查三件事：

1️⃣ key 有沒有在 authorized_keys
2️⃣ .ssh 權限對不對
3️⃣ authorized_keys 權限對不對

只要 其中一個不合格 →
❌ Permission denied (publickey)
