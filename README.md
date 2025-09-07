# הפורט שעליו השרת ירוץ
PORT=3000

# סוד ליצירת JWT (בהמשך נוסיף אימות)
JWT_SECRET=superSecretKey123

# חיבור ל-Supabase (נשתמש כשנעבור ל-DB אמיתי)
SUPABASE_URL=https://ebpblbglrqypymaleaoy.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVicGJsYmdscnF5cHltYWxlYW95Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjU2ODU1MywiZXhwIjoyMDY4MTQ0NTUzfQ.DQmI1aG2ySfSCeS6SxWg27S0iwChpUprA4q-DGa78oA

🛠️ Server Side - Riddle Game
This is the server side of the system. It includes:

Connection to the server

Integration with MongoDB for database operations

When the client sends a request to create / update / delete a riddle, the action is executed directly on the database.

🧩 Player Management:
The creation of a new player is handled through a separate database.

✅ Currently in final stages of development.

🛠️ צד שרת - משחק החידות
זהו צד השרת של המערכת. הוא כולל:

חיבור לשרת

אינטגרציה עם MongoDB לצורך פעולות במסד הנתונים

כאשר הלקוח יוצר / מעדכן / מוחק חידה – הפעולה מתבצעת ישירות במסד הנתונים.

🧩 ניהול שחקנים:
יצירת שחקן חדש מתבצעת מול מסד נתונים נפרד.

✅ כעת בשלבים האחרונים של הפיתו
