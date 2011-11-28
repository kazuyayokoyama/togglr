class Status < ActiveRecord::Base
  def self.create_with_uid_and_offon(provider, uid, offon)
    create! do |status|
      status.provider = provider
      status.uid = uid
      status.offon = offon
    end
  end
end