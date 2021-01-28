
Course.destroy_all
Hole.destroy_all
User.destroy_all
Round.destroy_all
HoleRound.destroy_all

Course.create(name: "Pebble Beach", location: "Pebble Beach, CA", par: 72)
Course.create(name: "Augusta National", location: "Augusta, GA", par: 72)
Course.create(name: "Wint Point Golf & Country Club", location: "Bainbridge Island, WA", par: 72)
Course.create(name: "Westchester", location: "Los Angeles, CA", par: 64)


Hole.create(par: 5, distance: 388, course_id: 3, image: 'assets/5-388-hole1-WP.png' )
Hole.create(par: 3, distance: 158, course_id: 3, image: 'assets/3-158-hole2-WP.png' )
Hole.create(par: 4, distance: 308, course_id: 3, image: 'assets/4-308-hole3-WP.png' )
Hole.create(par: 3, distance: 113, course_id: 3, image: 'assets/3-113-hole4-WP.png' )
Hole.create(par: 5, distance: 416, course_id: 3, image: 'assets/5-419-hole5-WP.png' )
Hole.create(par: 4, distance: 282, course_id: 3, image: 'assets/4-282-hole6-WP.png' )
Hole.create(par: 4, distance: 286, course_id: 3, image: 'assets/4-286-hole7-WP.png' )
Hole.create(par: 4, distance: 236, course_id: 3, image: 'assets/4-236-hole8-WP.png' )
Hole.create(par: 4, distance: 314, course_id: 3, image: 'assets/4-314-hole9-WP.png' )
Hole.create(par: 3, distance: 194, course_id: 3, image: 'assets/3-194-hole10-WP.png' )
Hole.create(par: 4, distance: 386, course_id: 3, image: 'assets/4-386-hole11-WP.png' )
Hole.create(par: 3, distance: 184, course_id: 3, image: 'assets/3-184-hole12-WP.png' )
Hole.create(par: 4, distance: 239, course_id: 3, image: 'assets/4-239-hole13-WP.png' )
Hole.create(par: 4, distance: 304, course_id: 3, image: 'assets/4-304-hole14-WP.png' )
Hole.create(par: 4, distance: 368, course_id: 3, image: 'assets/4-368-hole15-WP.png' )
Hole.create(par: 4, distance: 333, course_id: 3, image: 'assets/4-333-hole16-WP.png' )
Hole.create(par: 5, distance: 382, course_id: 3, image: 'assets/5-382-hole17-WP.png' )
Hole.create(par: 4, distance: 378, course_id: 3, image: 'assets/4-378-hole18-WP.png' )

User.create(username: "charlie")

Round.create(user_id: 1, name: '1/26/21 pebble', course_id: 1, length: 18)
Round.create(user_id: 1, name: '12/26/20 pebble', course_id: 1, length: 18)


18.times do |x|
   HoleRound.create(score: rand(3..9), hole_id: x + 1, round_id: 1, user_id: 1, course_id: 1)
end


18.times do |x|
   HoleRound.create(score: rand(3..9), hole_id: x + 1 , round_id: 2, user_id: 1, course_id: 1)
end
