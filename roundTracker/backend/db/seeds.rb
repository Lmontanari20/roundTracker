
Course.destroy_all
Hole.destroy_all
User.destroy_all
Round.destroy_all
HoleRound.destroy_all

Course.create(name: "Pebble Beach", location: "Pebble Beach, CA", par: 72)
Course.create(name: "Augusta National", location: "Augusta, GA", par: 72)
Course.create(name: "Wint Point Golf & Country Club", location: "Bainbridge Island, WA", par: 72)
Course.create(name: "Westchester", location: "Los Angeles, CA", par: 64)

#pebble beach 
Hole.create(par: 4, distance: 331, course_id: 1, image: 'assets/4-331-hole1-PB.png' )
Hole.create(par: 5, distance: 463, course_id: 1, image: 'assets/5-463-hole2-PB.png' )
Hole.create(par: 4, distance: 354, course_id: 1, image: 'assets/4-354-hole3-PB.png' )
Hole.create(par: 4, distance: 294, course_id: 1, image: 'assets/4-294-hole4-PB.png' )
Hole.create(par: 3, distance: 142, course_id: 1, image: 'assets/3-142-hole5-PB.png' )
Hole.create(par: 5, distance: 464, course_id: 1, image: 'assets/5-464-hole6-PB.png' )
Hole.create(par: 3, distance: 98, course_id: 1, image: 'assets/3-98-hole7-PB.png' )
Hole.create(par: 4, distance: 377, course_id: 1, image: 'assets/4-377-hole8-PB.png' )
Hole.create(par: 4, distance: 458, course_id: 1, image: 'assets/4-458-hole9-PB.png' )
Hole.create(par: 4, distance: 426, course_id: 1, image: 'assets/4-426-hole10-PB.png' )
Hole.create(par: 4, distance: 359, course_id: 1, image: 'assets/4-359-hole11-PB.png' )
Hole.create(par: 3, distance: 185, course_id: 1, image: 'assets/3-185-hole12-PB.png' )
Hole.create(par: 4, distance: 388, course_id: 1, image: 'assets/4-388-hole13-PB.png' )
Hole.create(par: 5, distance: 509, course_id: 1, image: 'assets/5-509-hole14-PB.png' )
Hole.create(par: 4, distance: 369, course_id: 1, image: 'assets/4-369-hole15-PB.png' )
Hole.create(par: 4, distance: 370, course_id: 1, image: 'assets/4-370-hole16-PB.png' )
Hole.create(par: 3, distance: 159, course_id: 1, image: 'assets/3-159-holes17-PB.png' )
Hole.create(par: 5, distance: 484, course_id: 1, image: 'assets/5-484-hole18-PB.png' )

#augusta
Hole.create(par: 4, distance: 402, course_id: 2, image: 'assets/4-402-hole1-AG.png' )
Hole.create(par: 4, distance: 369, course_id: 2, image: 'assets/4-369-hole2-AG.png' )
Hole.create(par: 4, distance: 418, course_id: 2, image: 'assets/4-418-hole3-AG.png' )
Hole.create(par: 3, distance: 138, course_id: 2, image: 'assets/3-138-hole4-AG.png' )
Hole.create(par: 5, distance: 431, course_id: 2, image: 'assets/5-431-hole5-AG.png' )
Hole.create(par: 3, distance: 195, course_id: 2, image: 'assets/3-195-hole6-AG.png' )
Hole.create(par: 4, distance: 336, course_id: 2, image: 'assets/4-336-hole7-AG.png' )
Hole.create(par: 5, distance: 569, course_id: 2, image: 'assets/5-569-hole8-AG.png' )
Hole.create(par: 4, distance: 373, course_id: 2, image: 'assets/4-373-hole9-AG.png' )
Hole.create(par: 4, distance: 372, course_id: 2, image: 'assets/4-372-hole10-AG.png' )
Hole.create(par: 5, distance: 514, course_id: 2, image: 'assets/5-514-hole11-AG.png' )
Hole.create(par: 3, distance: 201, course_id: 2, image: 'assets/3-201-hole12-AG.png' )
Hole.create(par: 4, distance: 431, course_id: 2, image: 'assets/4-432-hole13-AG.png' )
Hole.create(par: 3, distance: 134, course_id: 2, image: 'assets/3-134-hole14-AG.png' )
Hole.create(par: 5, distance: 504, course_id: 2, image: 'assets/5-504-hole15-AG.png' )
Hole.create(par: 4, distance: 376, course_id: 2, image: 'assets/4-376-hole16-AG.png' )
Hole.create(par: 4, distance: 393, course_id: 2, image: 'assets/4-393-hole17-AG.png' )
Hole.create(par: 4, distance: 386, course_id: 2, image: 'assets/4-386-hole18-AG.png' )

#wing point
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

#westchester
Hole.create(par: 3, distance: 106, course_id: 4, image: 'assets/3-106-hole1-WC.png' )
Hole.create(par: 4, distance: 319, course_id: 4, image: 'assets/4-319-hole2-WC.png' )
Hole.create(par: 3, distance: 160, course_id: 4, image: 'assets/3-160-hole3-WC.png' )
Hole.create(par: 3, distance: 129, course_id: 4, image: 'assets/3-129-hole4-WC.png' )
Hole.create(par: 4, distance: 256, course_id: 4, image: 'assets/4-256-hole5-WC.png' )
Hole.create(par: 4, distance: 272, course_id: 4, image: 'assets/4-272-hole6-WC.png' )
Hole.create(par: 4, distance: 253, course_id: 4, image: 'assets/4-253-hole7-WC.png' )
Hole.create(par: 3, distance: 134, course_id: 4, image: 'assets/3-134-hole8-WC.png' )
Hole.create(par: 4, distance: 318, course_id: 4, image: 'assets/4-318-hole9-WC.png' )
Hole.create(par: 4, distance: 324, course_id: 4, image: 'assets/4-324-hole10-WC.png' )
Hole.create(par: 3, distance: 124, course_id: 4, image: 'assets/3-124-hole11-WC.png' )
Hole.create(par: 3, distance: 135, course_id: 4, image: 'assets/3-135-hole12-WC.png' )
Hole.create(par: 3, distance: 129, course_id: 4, image: 'assets/3-129-hole13-WC.png' )
Hole.create(par: 3, distance: 126, course_id: 4, image: 'assets/3-126-hole14-WC.png' )
Hole.create(par: 5, distance: 449, course_id: 4, image: 'assets/5-449-hole15-WC.png' )
Hole.create(par: 3, distance: 138, course_id: 4, image: 'assets/3-138-hole16-WC.png' )
Hole.create(par: 4, distance: 294, course_id: 4, image: 'assets/4-294-hole17-WC.png' )
Hole.create(par: 4, distance: 271, course_id: 4, image: 'assets/4-271-hole18-WC.png' )


User.create(username: "charlie")

Round.create(user_id: 1, name: '1/26/21 pebble', course_id: 1, length: 18)
Round.create(user_id: 1, name: '12/26/20 pebble', course_id: 1, length: 18)


18.times do |x|
   HoleRound.create(score: rand(3..9), hole_id: x + 1, round_id: 1, user_id: 1, course_id: 1)
end


18.times do |x|
   HoleRound.create(score: rand(3..9), hole_id: x + 1 , round_id: 2, user_id: 1, course_id: 1)
end
